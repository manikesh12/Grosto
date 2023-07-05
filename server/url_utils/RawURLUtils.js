(() => {
  const { URL, URLSearchParams } = require("url");
  const path = require("path");
  const fs = require("fs");

  const { NameSpace } = require("../namespaces.js");
  const products_list_loc = JSON.parse(NameSpace.FILELOCATIONS).products_list;

  function checkProduct(product_id, products_list) {
    for (let i = 0; i < products_list.length; i++) {
      const product_item = products_list[i];
      if (product_id === product_item.product_id) {
        return product_item;
      }
    }
    return false;
  }
  function section_list(min_value, max_value, product_list) {
    try {
      min_value = parseInt(min_value);
      max_value = parseInt(max_value);
      return product_list.slice(min_value, max_value);
    } catch (err) {
      return false;
    }
  }

  function resolveAPIRequest(vars, res) {
    const searchParams = vars.searchParams;
    fs.readFile(
      path.join(NameSpace.INDEX.pathVars.ROOT, products_list_loc),
      (err, content) => {
        if (err) {
          throw err;
        }
        const products_list = JSON.parse(content);
        let responseSent = 0;
        if (searchParams.get("type") === "single_product") {
          const APIProduct_id = parseInt(searchParams.get("product_id"));
          const product = checkProduct(APIProduct_id, products_list);
          if (product) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product), "utf8");
            responseSent += 1;
          }
        } else if (searchParams.get("type") === "collection") {
          const listSection = section_list(
            searchParams.get("start_index"),
            searchParams.get("end_index"),
            products_list
          );
          if (listSection) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(listSection), "utf8");
            responseSent += 1;
          }
        } else if (searchParams.get("type") === "categories") {
          const product_collection = [];
          products_list.forEach((product) => {
            if (
              searchParams.get("category") ===
              product.product_aisle.toLowerCase()
            ) {
              product_collection.push(product);
            }
          });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(product_collection), "utf8");
          responseSent += 1;
        }
        if (!responseSent) {
          const errObj = {};
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify(errObj), "utf8");
          console.log("Error");
        }
      }
    );
  }

  /**
   * Detects if a request is a valid API request
   * @param {String} reqURL path of the folder that the client is requesting from. [SHOULD NOT BE AN ADDRESS!]
   * @param {String} webAddress The address of our domain (with port if it has one)
   * @returns {Boolean}
   */
  function detectAPIRequest(reqURL, webAddress) {
    // Check if the URL path asks for an api request
    if (!/^\/api\?.+/.test(reqURL)) {
      return [false];
    }
    // Since the client is making for an api request, we will now use the full URL
    // of the request by prefixing with our domain
    reqWebURL = `${webAddress}${reqURL}`;
    try {
      // If it asks for an api request then try to convert it into a URL
      const reqWebURLObj = new URL(reqWebURL);
      const sear = new URLSearchParams(reqWebURLObj.search);
      // console.log(reqWebURL);
      // console.log(sear);
      return [
        true,
        resolveAPIRequest,
        { searchParams: reqWebURLObj.searchParams },
      ];
    } catch (error) {
      console.log("error");
      return [false];
    }
  }

  module.exports = { detectAPIRequest, resolveAPIRequest };
})();
