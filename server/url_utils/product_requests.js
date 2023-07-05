const path = require("path");
const fs = require("fs");
const URL_utils = require("./URL_utils.js");
const file_utils = require("../file_utils/file_utils");
const { NameSpace } = require("../namespaces.js");
const productIDsLocation = JSON.parse(NameSpace.FILELOCATIONS).productids_list;

function checkValidProductID(reqURL, res) {
  const cut = reqURL.lastIndexOf("/");
  const reqPageMalformed = reqURL.slice(cut + 1);
  let reqProdID;
  // console.log(reqPageMalformed.slice());
  // console.log(reqPageMalformed.indexOf(".html"));
  if (reqPageMalformed.indexOf(".html") === -1) {
    reqProdID = reqPageMalformed;
  } else {
    reqProdID = reqPageMalformed.slice(0, -5);
  }
  fs.readFile(
    path.join(NameSpace.INDEX.pathVars.ROOT, productIDsLocation),
    "utf8",
    (err, prodIDContent) => {
      if (err) {
        throw err;
      }
      const validProductIDs = JSON.parse(prodIDContent);
      let tracker = 0;
      for (let i = 0; i < validProductIDs.length; i++) {
        if (reqProdID === validProductIDs[i].toString()) {
          fs.readFile(
            path.join(
              NameSpace.INDEX.pathVars.PUBLICDIR,
              "pages",
              "cus_product_page.html"
            ),
            "utf8",
            (err, content) => {
              if (err) {
                throw err;
              }
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(content, "utf8");
            }
          );
          tracker += 1;
          break;
        }
      }
      if (!tracker) {
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
      }
    }
  );
  return reqProdID;
}

function checkProductPage(filePath) {
  const exclusion_files = [".css", ".js"];
  filePath = file_utils.addExt(filePath, ".html", exclusion_files);
  // console.log(/\/category_page\/.+html$/.test(filePath), filePath);
  if (/\/product_page\/.+html$/.test(filePath)) {
    return true;
  }
  return false;
}

// const list = [
//   "/product_page.html",
//   "/product_page/",
//   "/product_page/123.html",
//   "/product_page/123.css",
//   "/product_page/123",
//   "/product_page/abc",
//   "/product_pag",
//   "/",
//   "/pages/products.html",
// ];
// list.forEach((url_path) => {
//   const result = checkCategoryPage(url_path);
// });

// list.forEach((link) => {
//   console.log(checkCategoryPage(link));
// });
module.exports = { checkProductPage, checkValidProductID };
