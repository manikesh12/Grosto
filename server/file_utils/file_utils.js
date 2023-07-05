const path = require("path");
const fs = require("fs");
const { NameSpace } = require("../namespaces.js");

function checkFileExists(fullPath) {}
function fixPath(filePath) {
  if (/.\/$/.test(filePath)) {
    return filePath.slice(0, -1);
  } else {
    return filePath;
  }
}

function addExt(filePath, extname, extExceptions) {
  if (filePath === "/") {
    return filePath;
  }
  filePath = fixPath(filePath);
  extExceptions.push(extname);
  let fileName = path.basename(filePath);
  const fileDir = path.dirname(filePath);
  const fileExt = path.extname(fileName);
  for (let i = 0; i < extExceptions.length; i++) {
    const ignoreExt = extExceptions[i];
    if (fileExt === ignoreExt) {
      return filePath;
    }
  }
  fileName = fileName + extname;
  if (fileDir === "/") {
    return `/${fileName}`;
  }
  return `${fileDir}/${fileName}`;
}

module.exports = { addExt };
