import * as CM from "/scripts/common scripts/common_M.js";
// import { PRODUCTPAGE } from "/scripts/product_page/productPage.js";
function calcProductDetails(PRODUCTPAGE) {
  const productDetails = PRODUCTPAGE.productDetails;

  const descriptor_01 = {
    fillElements: {
      product_name: [".product_name", "title"],
      product_description: [".product_description"],
      price: ["#price-per-gram"],
    },
  };
  const descriptor_02 = {
    product_picture_path: [".product_image"],
  };

  const unitInputE = document.querySelector("#unitInput");
  const sliderE = document.querySelector("#unitSlider");
  const inputSwitchE = document.querySelector("#input-switch");

  const addCartE = document.querySelector("#add_cart_btn");
  const cartMessageE = document.querySelector(".cart-message");

  let currentQuantity = null;
  let currentPrice = null;

  PRODUCTPAGE.cartObj = {
    product_id: productDetails.product_id,
    product_name: productDetails.product_name,
    product_picture_path: productDetails.product_picture_path,
    product_price: productDetails.price,
    quantity: null,
    product_total_price: null,
  };

  function fillElements(productDetails, descriptor) {
    for (const [key, attr_values] of Object.entries(descriptor)) {
      attr_values.forEach((attr_value) => {
        const elems = document.querySelectorAll(attr_value);
        if (key.toString() == "price") {
          elems.forEach((elem) => {
            elem.textContent = productDetails[key] * 1000;
          });
        } else {
          elems.forEach((elem) => {
            elem.textContent = productDetails[key];
          });
        }
      });
    }
  }

  function fillImage(productDetails, descriptor) {
    for (const [key, attr_values] of Object.entries(descriptor)) {
      attr_values.forEach((attr_value) => {
        const elems = document.querySelectorAll(attr_value);
        elems.forEach((elem) => {
          elem.src = productDetails[key];
        });
      });
    }
  }

  /**
   * Appends grams or kilograms (depending on the parameter passed) to the number value
   * @param {Number} number A positive number or float
   * @returns {String}      Appended the grams or kilograms symbol to the value
   */
  function gramValueToString(number) {
    // Input Validation
    try {
      if (!CM.checkInput(number, "number")) {
        throw new Error(
          `Given grams value (positive number expected) is not a number\nInput Given: ${number} | [${typeof number}]`
        );
      } else if (number < 0) {
        throw new Error(
          `Given grams value (positive number expected) is negative\nInput Given: ${number}`
        );
      }
    } catch (error) {
      console.error(error);
      return `[An Unexpeted Error Has Occured]`;
    }
    // Passed Validation
    return number >= 1000 ? `${number / 1000}kg` : `${number}g`;
  }

  /**
   * calculates the final price and manipluates the necessary html content on the page
   * @param {object} productPrice the price of the product per unit
   * @param {Number} userQuantity    the price that the user entered
   */
  function calcPrice(productPrice, userQuantity) {
    const confirmedQuantityE = document.querySelector("#confirmed-quantity");
    const finalPriceE = document.querySelector("#calculate_price");
    const quantityValueString = gramValueToString(userQuantity);
    // Input Validation
    try {
      if (Number.isNaN(userQuantity)) {
        confirmedQuantityE.textContent = `0`;
        finalPriceE.textContent = `0`;
        throw new Error(
          `Given user price (positive number expected) is not a number\nInput Given: ${userQuantity} | [${typeof userQuantity}]`
        );
      } else if (!CM.checkInput(userQuantity, "number")) {
        throw new Error(
          `Given user price (positive number expected) is not a number\nInput Given: ${userQuantity} | [${typeof userQuantity}]`
        );
      } else if (userQuantity < 0) {
        throw new Error(
          `Given user price (positive number expected) is negative\nInput Given: ${userQuantity}`
        );
      }
    } catch (error) {
      console.error(error);
      return `[An Unexpeted Error Has Occured]`;
    }
    // Passed Validation
    const finalPrice = CM.roundToTwo(userQuantity * productPrice);
    confirmedQuantityE.textContent = `${quantityValueString}`;
    finalPriceE.textContent = `${finalPrice}`;

    // Updating the state variables to the current quantity and price
    currentQuantity = userQuantity;
    currentPrice = finalPrice;
  }

  function addToCart() {
    const userCartString = localStorage.getItem("user_cart");
    const userCart = JSON.parse(userCartString);
    let tracker = false;

    userCart.forEach((product) => {
      if (product.product_id === PRODUCTPAGE.cartObj.product_id) {
        product.quantity += currentQuantity;
        product.product_total_price += currentPrice;
        tracker = true;
      }
    });
    if (!tracker) {
      PRODUCTPAGE.cartObj.quantity = currentQuantity;
      PRODUCTPAGE.cartObj.product_total_price = currentPrice;
      userCart.push(PRODUCTPAGE.cartObj);
    }
    const userCartStringified = JSON.stringify(userCart);
    localStorage.setItem("user_cart", userCartStringified);

    cartMessageE.classList.remove("disp-none");
    setTimeout(() => {
      cartMessageE.classList.add("disp-none");
    }, 3000);
  }

  /**
   * Adds all the event listeners to the page
   */
  function addEventListeners() {
    inputSwitchE.addEventListener("click", (e) => {
      if ([...unitInputE.classList].indexOf("active-input") === -1) {
        sliderE.classList.remove("active-input");
        sliderE.classList.add("disp-none");
        unitInputE.classList.add("active-input");
        calcPrice(productDetails.price, parseInt(unitInputE.value));
      } else {
        unitInputE.classList.remove("active-input");
        unitInputE.classList.add("disp-none");
        sliderE.classList.add("active-input");
        calcPrice(productDetails.price, parseInt(sliderE.value));
      }
    });

    sliderE.addEventListener("input", (e) => {
      calcPrice(productDetails.price, parseInt(e.target.value));
    });

    unitInputE.addEventListener("input", (e) => {
      calcPrice(productDetails.price, parseInt(e.target.value));
    });

    // Displays the "added to cart" message to the user for some duration
    addCartE.addEventListener("click", (e) => {
      addToCart();
    });
  }

  function DOMLoadedFunctions() {
    function wait(ms) {
      var start = new Date().getTime();
      var end = start;
      while (end < start + ms) {
        end = new Date().getTime();
      }
    }
    wait(1500);
    fillElements(productDetails, descriptor_01.fillElements);
    fillImage(productDetails, descriptor_02);
    calcPrice(productDetails.price, parseInt(sliderE.value));
  }

  DOMLoadedFunctions();
  addEventListeners();
}
export { calcProductDetails };
