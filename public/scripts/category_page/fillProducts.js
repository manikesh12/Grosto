(() => {
  const URLPATHNAME = window.location.pathname;
  const apiParams = {
    type: "categories",
    category: getCatFromPath(URLPATHNAME),
  };
  const xhr = new XMLHttpRequest();
  const result = constructAPIURL(apiParams);

  const productSection = document.querySelector(".products__container");
  const categoryTitleEs = Array.from(
    document.querySelectorAll(".category-name")
  );
  categoryTitleEs.forEach((categoryTitleE) => {
    categoryTitleE.textContent = upperCaseFirstLetter(apiParams.category);
  });

  let resText;
  xhr.onload = function () {
    if (this.status === 200) {
      resText = this.responseText;
    }
    // console.log(resText);
    const response = JSON.parse(resText);
    console.log(response);
    response.forEach((productData) => {
      // console.log(productSection);
      productCard = document.createElement("div");
      productCard.setAttribute("class", "product-card");
      productCard.innerHTML = innerCardContent(
        productData.product_id,
        productData.product_name,
        productData.product_picture_path,
        productData.price * 1000,
        productData.product_tags
      );
      productSection.appendChild(productCard);
    });
  };

  function getCatFromPath(path) {
    const catStartIndex = path.lastIndexOf("/") + 1;
    // console.log(catStartIndex);
    return path.slice(catStartIndex);
  }
  function constructAPIURL(apiParams) {
    let apiURL = `/api?`;
    for (const [key, value] of Object.entries(apiParams)) {
      apiURL += `${key}=${value}&`;
    }
    apiURL = apiURL.slice(0, -1);
    return apiURL;
  }
  function upperCaseFirstLetter(text) {
    return text[0].toUpperCase() + text.slice(1);
  }
  // console.log(URLPATHNAME);
  // console.log(result);

  xhr.open("GET", result, true);
  xhr.send();
  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  wait(1500);
  function innerCardContent(id, name, imageLocation, price, tags) {
    htmlContent = `
      <picture class="product-card__pic-tag">
        <img
          src="${imageLocation}"
          alt="An image of ${name}"
          class="product-card__pic no-events"
        />
      </picture>
      <h2 class="product-card__name no-events">${name}</h2>
      <span class="product-card__price no-events"><strong>MRP: &#8377;${price}</strong></span>
      <a href="/pages/product_page/${id}" class="anchor purch-btn bg-color__transition">
        <strong class="purch-btn__text">Purchase Item</strong>
      </a>`;
    return htmlContent;
  }
})();
