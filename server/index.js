(() => {
  const http = require("http");
  const path = require("path");
  const fs = require("fs");

  const { NameSpace } = require("./namespaces.js");
  const URL_utils = require("./url_utils/URL_utils.js");
  const RawURLUtils = require("./url_utils/RawURLUtils.js");
  const special_requests = require("./url_utils/special_requests.js");
  const product_requests = require("./url_utils/product_requests.js");

  const pathVars = {
    CWD: __dirname,
    ROOT: path.dirname(__dirname),
  };
  pathVars.PUBLICDIR = path.join(pathVars.ROOT, "public");
  pathVars.LOGDIR = path.join(pathVars.CWD, "logs");

  let hostFile = fs.readFileSync(
    `${pathVars.ROOT}/server/data_files/hostfile.json`,
    "utf8",
    (read_err) => {
      if (read_err) throw read_err;
    }
  );
  let contentTypes = fs.readFileSync(
    `${pathVars.ROOT}/server/data_files/contentTypes.json`,
    "utf8",
    (read_err) => {
      if (read_err) throw read_err;
    }
  );

  contentTypes = JSON.parse(contentTypes);
  hostFile = JSON.parse(hostFile);

  NameSpace.INDEX.PORT = process.env.PORT || hostFile.PORT;
  NameSpace.INDEX.HOST = hostFile.HOST;
  NameSpace.INDEX.webAddress = `http://${NameSpace.INDEX.HOST}:${NameSpace.INDEX.PORT}`;
  NameSpace.INDEX.pathVars = pathVars;
  //
  function rawLog(msg, logDir) {
    logFileLocation = path.join(pathVars.LOGDIR, "log.txt");
    fs.appendFileSync(logFileLocation, `${msg}\n`);
  }

  const server = http.createServer((client_req, res) => {
    reqURL = client_req.url;
    // console.log(reqURL);
    const beforeFuncs = {
      isApiRequest: () => {
        return RawURLUtils.detectAPIRequest(reqURL, NameSpace.INDEX.webAddress);
      },
      specialProductRequest: () => {
        if (product_requests.checkProductPage(reqURL)) {
          return [true, product_requests.checkValidProductID, reqURL];
        } else {
          return [false];
        }
      },
      specialFileRequest: () => {
        // const filePath = URL_utils.sanitizeURL(reqURL, pathVars, contentTypes);
        if (special_requests.checkCategoryPage(reqURL)) {
          return [true, special_requests.checkValidCategory, reqURL];
        } else {
          return [false];
        }
      },
      fileRequest: () => {
        // Sanitize file name
        const filePath = URL_utils.sanitizeURL(reqURL, pathVars, contentTypes);
        let rTCVars = URL_utils.resolveClientRequestURLPath(
          filePath,
          contentTypes
        );
        return [true, URL_utils.responseToClient, rTCVars];
      },
    };
    for (const [key, value] of Object.entries(beforeFuncs)) {
      const result = value();
      // console.log(key, result);
      if (result[0]) {
        result[1](result[2], res);
        break;
      }
    }
    // const beforeFuncs = {
    //   isApiRequest:
    // }
  });

  const app = server.listen(NameSpace.INDEX.PORT, () => {
    console.log(`Server running on ${NameSpace.INDEX.webAddress}`);
  });
})();
