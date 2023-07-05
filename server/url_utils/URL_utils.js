const path = require("path");
const fs = require("fs");

const { NameSpace } = require("../namespaces.js");

function getContentType(fileNameExt, contentTypes) {
  let contentType = null;
  // Checking if the file extension is present in one of the keys
  if (Object.keys(contentTypes).indexOf(fileNameExt) !== -1) {
    contentType = contentTypes[fileNameExt];
  } else {
    return false;
  }
  return contentType;
}

/**
 * converts a filepath that may or may not have .html extension and return one which does
 * @param {String} filePath client request filepath
 * @returns {String} filepath with the proper filename extension
 */
function sanitizeURL(reqURL, pathVars) {
  // Correct the file path so it can handle encoded characters like spaces and other encoded characters
  // Ex: %20 will be converted to ' '
  let filePath = decodeURIComponent(reqURL);
  // Resolve the path if the client requests for the home page to index.html
  filePath = path.join(
    pathVars.PUBLICDIR,
    filePath === "/" ? "index.html" : filePath
  );
  // gets the file name from the filePath
  fileName = path.basename(filePath);
  let fileDirName = path.dirname(filePath);
  // Checks if the file name does not contain .html extension
  if (/^\w+$/.test(fileName)) {
    filePath = path.join(
      NameSpace.INDEX.pathVars.PUBLICDIR,
      "pages",
      `${fileName}.html`
    );
    return filePath;
  }
  return filePath;
}

function resolveClientRequestURLPath(filePath, contentTypes) {
  // Get filename extension without the period (.)
  const fileNameExt = path.extname(filePath).slice(1);
  // Get the content type of the file
  let contentType = getContentType(fileNameExt, contentTypes);
  // Create an object with the final response of file location and content type
  const finalResponse = {
    filePath: filePath,
    contentType: contentType,
  };
  // console.log(finalResponse);
  return finalResponse;
}

function responseToClient(vars, res) {
  const filePath = vars.filePath;
  const contentType = vars.contentType;
  // Response to client
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // console.log(err);
      // throw err;
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(
            NameSpace.INDEX.pathVars.PUBLICDIR,
            "pages",
            "not_found.html"
          ),
          (notFoundFile_err, content) => {
            if (notFoundFile_err) throw notFoundFile_err;
            res.writeHead(400, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${500}`, "utf8");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
}

module.exports = {
  getContentType,
  sanitizeURL,
  resolveClientRequestURLPath,
  responseToClient,
};
