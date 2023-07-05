/**
 * Returns the type of the object passed only if it's a primitive
 * @param {*} given_obj Any given object
 * @returns {String}
 */
function getInputType(given_obj) {
  switch (typeof given_obj) {
    case "number":
      return Number;
      break;
    case "string":
      return String;
      break;
    case "function":
      return Function;
      break;
    case "object":
      return Object;
      break;
    default:
      return false;
      break;
  }
}

/**
 *
 * @param {*} given_obj any given object
 * @param {String} expectedType any given expected type, equates to the
 *                              return value of the type of operator
 * @returns {Boolean}
 */
function checkInput(given_obj, expectedType) {
  return typeof given_obj === expectedType ? true : false;
}

/**
 * Appends grams or kilograms (depending on the parameter passed) to the number value
 * @param {Number} number A positive number or float
 * @returns {String}      Appended the grams or kilograms symbol to the value
 */
function gramValueToString(number) {
  // Input Validation
  try {
    if (!checkInput(number, "number")) {
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
 * @param {Number} userPrice    the price that the user entered
 */
function calcPrice(productPrice, userPrice) {
  // Input Validation
  try {
    if (!checkInput(userPrice, "number")) {
      throw new Error(
        `Given user price (positive number expected) is not a number\nInput Given: ${userPrice} | [${typeof userPrice}]`
      );
    } else if (userPrice < 0) {
      throw new Error(
        `Given user price (positive number expected) is negative\nInput Given: ${userPrice}`
      );
    }
  } catch (error) {
    console.error(error);
    return `[An Unexpeted Error Has Occured]`;
  }
  // Passed Validation
  const confirmedQuantityE = document.querySelector("#confirmed-quantity");
  const finalPriceE = document.querySelector("#calculate_price");
  const quantityValueString = gramValueToString(userPrice);

  confirmedQuantityE.textContent = `${quantityValueString}`;
  finalPriceE.textContent = `${userPrice * productPrice}`;
}

const productNameElements = document.querySelectorAll(".product_name");
const sliderE = document.querySelector("#noOfGrams");
// const productDetails = {
//   product_id: 124,
//   product_name: "Carrot",
//   product_description:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates neque quibusdam at deleniti magnam facilis placeat sint quam velit corrupti voluptate incidunt ad, laudantium libero vitae laborum ratione totam! Saepe.",
//   product_picture_path: "/media/grocery items pics/carrot--large_01.jpg",
//   product_aisle: "Vegetables",
//   product_price: 0.15,
//   unit_system: 0,
//   quantity: 800,
//   product_tags: ["vegetable", "treelike", "orange", "long", "produce"],
// };

// const descriptor = {
//   product_name: [".product_name"],
//   product_description: [".product_description"],
// };
const descriptor_01 = {
  fillElements: {
    product_name: [".product_name", "title"],
    product_description: [".product_description"],
    product_price: ["#price-per-gram"],
  },
  // setPriceDetails ={

  // }
};
function fillElements(productDetails, descriptor) {
  for ([key, attr_values] of Object.entries(descriptor)) {
    attr_values.forEach((attr_value) => {
      const elems = document.querySelectorAll(attr_value);
      console.log(elems);
      elems.forEach((elem) => {
        elem.textContent = productDetails[key];
      });
    });
  }
}
fillElements(productDetails, descriptor_01.fillElements);

calcPrice(productDetails.product_price, parseInt(sliderE.value));
document.addEventListener("input", (e) => {
  calcPrice(productDetails.product_price, parseInt(e.target.value));
});

// ----------------------------------------------------
// const userNavElement = document.querySelector("#user_nav");
// const userNavList = [
//   {
//     name: "Home",
//     href: "http://127.0.0.1:5500/",
//   },
//   {
//     name: "Vegetables",
//     href: "http://127.0.0.1:5500/pages/product_page.html",
//   },
// ];
// const fin = JSON.stringify(userNavList);
// localStorage.setItem("userNavList", fin);
// const userNavList = JSON.parse(localStorage.getItem("userNavList"));
// console.log(fon2);

// userNavList.forEach((navigationObject) => {
//   const userNavArrow = document.createElement("span");
//   const pageLinkElement = document.createElement("a");

//   pageLinkElement.textContent = navigationObject.name;
//   pageLinkElement.href = navigationObject.href;
//   pageLinkElement.classList.add("user-nav__link");

//   userNavArrow.textContent = " > ";
//   userNavArrow.classList.add("user-nav__arrow");

//   userNavElement.appendChild(pageLinkElement);
//   userNavElement.appendChild(userNavArrow);
// });
// userNavElement.removeChild(userNavElement.lastElementChild);
