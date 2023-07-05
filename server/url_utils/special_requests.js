const path = require("path");
const fs = require("fs");
const URL_utils = require("./URL_utils.js");
const file_utils = require("../file_utils/file_utils");
const { NameSpace } = require("../namespaces.js");
const categoriesLocation = JSON.parse(NameSpace.FILELOCATIONS).categories_list;

function checkValidCategory(reqURL, res) {
  const cut = reqURL.lastIndexOf("/");
  const reqPageMalformed = reqURL.slice(cut + 1);
  let reqCategory;
  // console.log(reqPageMalformed.slice());
  // console.log(reqPageMalformed.indexOf(".html"));
  if (reqPageMalformed.indexOf(".html") === -1) {
    reqCategory = reqPageMalformed;
  } else {
    reqCategory = reqPageMalformed.slice(0, -5);
  }
  fs.readFile(
    path.join(NameSpace.INDEX.pathVars.ROOT, categoriesLocation),
    "utf8",
    (err, cateContent) => {
      if (err) {
        throw err;
      }
      const validCategories = JSON.parse(cateContent);
      let tracker = 0;
      for (let i = 0; i < validCategories.length; i++) {
        if (reqCategory.toLowerCase() === validCategories[i].toLowerCase()) {
          fs.readFile(
            path.join(
              NameSpace.INDEX.pathVars.PUBLICDIR,
              "pages",
              "cus_category_page.html"
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
  return reqCategory;
}

function checkCategoryPage(filePath) {
  const exclusion_files = [".css", ".js"];
  filePath = file_utils.addExt(filePath, ".html", exclusion_files);
  // console.log(/\/category_page\/.+html$/.test(filePath), filePath);
  if (/\/category_page\/.+html$/.test(filePath)) {
    return true;
  }
  return false;
}

// const list = [
//   "/category_page.html",
//   "/category_page/",
//   "/category_page/123.html",
//   "/category_page/123.css",
//   "/category_page/123",
//   "/category_page/abc",
//   "/category_pag",
//   "/",
//   "/pages/catgories.html",
// ];
// list.forEach((url_path) => {
//   const result = checkCategoryPage(url_path);
// });

// list.forEach((link) => {
//   console.log(checkCategoryPage(link));
// });
module.exports = { checkCategoryPage, checkValidCategory };
