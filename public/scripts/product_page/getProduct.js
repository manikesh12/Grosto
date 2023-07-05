import { PRODUCTPAGE } from "/scripts/product_page/productPage.js";
import { calcProductDetails } from "/scripts/product_page/calcProductPage.js";

((PRODUCTPAGE, calcProductDetails) => {
  const URLPATHNAME = window.location.pathname;
  const apiParams = {
    type: "single_product",
    product_id: getPIDFromPath(URLPATHNAME),
  };
  const xhr = new XMLHttpRequest();
  const result = constructAPIURL(apiParams);
  let resText;
  xhr.onload = function () {
    if (this.status === 200) {
      resText = this.responseText;
    }
    // console.log(resText);
    const response = JSON.parse(resText);
    console.log(response);

    PRODUCTPAGE.productDetails = response;
    calcProductDetails(PRODUCTPAGE);
  };

  function getPIDFromPath(path) {
    const PIDStartIndex = path.lastIndexOf("/") + 1;
    // console.log(catStartIndex);
    return path.slice(PIDStartIndex);
  }
  function constructAPIURL(apiParams) {
    let apiURL = `/api?`;
    for (const [key, value] of Object.entries(apiParams)) {
      apiURL += `${key}=${value}&`;
    }
    apiURL = apiURL.slice(0, -1);
    return apiURL;
  }
  // console.log(URLPATHNAME);
  // console.log(result);
  xhr.open("GET", result, true);
  xhr.send();
})(PRODUCTPAGE, calcProductDetails);
