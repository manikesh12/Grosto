const http = require("http");
const path = require("path");
const fs = require("fs");
const cwd = __dirname;
const root = path.dirname(__dirname);
const publicDir = path.join(root, "public");
const logDir = path.join(cwd, "logs");

function rawLog(msg, logDir) {
  logFileLocation = path.join(logDir, "log.txt");
  fs.appendFileSync(logFileLocation, `${msg}\n`);
}

function resolveClientRequestURLPath(reqURL) {
  // Correct the file path so it can handle encoded characters like spaces and other encoded characters
  // Ex: %20 will be converted to ' '
  let filePath = decodeURIComponent(reqURL);
  console.log(filePath);
  // Resolve the path if the client requests for the home page to index.html
  filePath = path.join(publicDir, filePath === "/" ? "index.html" : filePath);
  const fileNameExt = path.extname(filePath).slice(1);
  console.log(fileNameExt);
  console.log("--------");
  // file_path = decodeURIComponent(file_path);
}

const server = http.createServer((client_req, res) => {
  // let pageName = "about";
  // let pageNameRegex = RegExp(`^\/${pageName}(\.html)?$`);
  // console.clear();
  console.log(client_req.url);
  rawLog(client_req.url, logDir);
  // console.log(client_req.method);
  // console.log(client_req.headers);
  // console.log("---------------");
  const fileName = client_req.url;
  const fileNameExt = path.extname(fileName).slice(1);
  let contentTypes = null;
  let contentType = "text/html";
  //
  let file_path = path.join(
    publicDir,
    client_req.url === "/" ? "index.html" : client_req.url
  );
  // Correct the file path so it can handle encoded characters like spaces and other encoded characters
  // Ex: %20 will be converted to ' '
  file_path = decodeURIComponent(file_path);
  // Get all content types to give the appropriate Content-Type header to the client
  contentTypes = fs.readFileSync(
    path.join(__dirname, "contentTypes.json"),
    "utf8",
    (read_err, read_data) => {
      if (read_err) throw read_err;
      contentTypes = read_data;
    }
  );
  contentTypes = JSON.parse(contentTypes);
  // Checking if the file extension is present in one of the keys
  if (Object.keys(contentTypes).indexOf(fileNameExt) !== -1) {
    contentType = contentTypes[fileNameExt];
  } else {
    res.writeHead(500, "Content Type not available");
  }
  console.log(contentType);
  fs.readFile(file_path, (err, content) => {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content, "utf8");
  });
  // console.log(file_path);
});

const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
const testing = [
  "/",
  "/styles/reset.css",
  "/styles/common_styles.css",
  "/styles/nav_styles.css",
  "/scripts/common%20scripts/common_components.js",
  "/styles/home/style.css",
  "/scripts/home/script.js",
  "/media/grocery%20items%20pics/carrot--large_01.jpg",
  "/media/grocery%20items%20pics/lettuce--large_01.jpg",
  "/media/grocery%20items%20pics/ladyfinger--medium_01.jpg",
  "/media/grocery%20items%20pics/tomatoes--medium_01.jpg",
  "/media/grocery%20items%20pics/onions--medium_01.jpg",
];
testing.forEach((reqURL) => {
  resolveClientRequestURLPath(reqURL);
});
