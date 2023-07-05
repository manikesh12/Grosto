const http = require("http");
const path = require("path");
const fs = require("fs");
const cwd = __dirname;
const root = path.dirname(__dirname);
const publicDir = path.join(root, "public");
const logDir = path.join(cwd, "logs");

let contentTypes = fs.readFileSync(
  path.join(__dirname, "contentTypes.json"),
  "utf8",
  (read_err, read_data) => {
    if (read_err) throw read_err;
    contentTypes = read_data;
  }
);
contentTypes = JSON.parse(contentTypes);

function getContentType(fileNameExt) {
  let contentType = null;
  // Checking if the file extension is present in one of the keys
  if (Object.keys(contentTypes).indexOf(fileNameExt) !== -1) {
    contentType = contentTypes[fileNameExt];
  } else {
    return false;
  }
  return contentType;
}
function rawLog(msg, logDir) {
  logFileLocation = path.join(logDir, "log.txt");
  fs.appendFileSync(logFileLocation, `${msg}\n`);
}
function resolveClientRequestURLPath(reqURL) {
  // Correct the file path so it can handle encoded characters like spaces and other encoded characters
  // Ex: %20 will be converted to ' '
  let filePath = decodeURIComponent(reqURL);
  // Resolve the path if the client requests for the home page to index.html
  filePath = path.join(publicDir, filePath === "/" ? "index.html" : filePath);
  // Get filename extension without the period (.)
  const fileNameExt = path.extname(filePath).slice(1);
  // Get the content type of the file
  contentType = getContentType(fileNameExt);
  // Create an object with the final response of file location and content type
  const finalResponse = {
    filePath: filePath,
    contentType: contentType,
  };
  return finalResponse;
}
function sanitizeURL(filePath) {
  fileName = path.basename(filePath);
  if (/^\w+$/.test(fileName)) {
    return path.join(path.dirname(filePath), `${fileName}.html`);
  }
  return filePath;
}

const server = http.createServer((client_req, res) => {
  reqURL = client_req.url;
  fileDetailsObj = resolveClientRequestURLPath(reqURL);
  rawLog(JSON.stringify(fileDetailsObj), logDir);

  let { filePath, contentType } = fileDetailsObj;
  rawLog(filePath, logDir);

  // Sanitize file name
  filePath = sanitizeURL(filePath);

  // Response to client
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(publicDir, "pages", "not_found.html"),
          (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
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
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
