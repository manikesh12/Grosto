import { globalFunctions } from "/scripts/common scripts/index_M.js";
import { CART } from "/scripts/cart/cart.js";
(function (CART, globalFunctions) {
  document.addEventListener("DOMContentLoaded", (e) => {
    let userCart = JSON.parse(localStorage.getItem("user_cart"));
    const checkoutBtnE = document.querySelector("#checkout-btn");
    const backToShoppingBtnE = document.querySelector("#backshopping-btn");

    function fillHTMLCart(userCart) {
      const productListE = document.querySelector(".products-list");

      userCart.forEach((product) => {
        const row = document.createElement("div");
        row.classList.add("cart-product-item");

        const htmlContent = `
      <div class="product-info__part product-img__wrapper">
        <picture class="product-image__pictag">
          <img src="${
            product.product_picture_path
          }" alt="" class="product-image" />
        </picture>
      </div>
      <span class="product-info__part">${product.product_name}</span>
      <span class="product-info__part">&#8377;${
        product.product_price * 1000
      }</span>
      <span class="product-info__part">${product.quantity}</span>
      <span class="product-info__part amount">&#8377;${
        product.product_total_price
      }</span>`;

        row.innerHTML = htmlContent;
        productListE.appendChild(row);
      });
    }

    /**
     * Fills up the Cart Summary of the page
     * @param {Array} userCart array of items that the user added to cart which is stored in localStorage
     */
    function calcCartSummary(userCart) {
      const numItemsE = document.querySelector("#numItems");
      const subtotalE = document.querySelector("#subtotal");
      const taxE = document.querySelector("#tax");
      const totalAmountE = document.querySelector("#totalAmount");

      // Calculate number of items in cart
      numItemsE.textContent = `${userCart.length}`;

      // Calculate subtotal
      let subtotal = 0;
      userCart.forEach((product) => {
        subtotal += product.product_total_price;
      });
      subtotalE.textContent = `${subtotal}`;

      // Calculate Tax
      let tax = Math.round(0.05 * subtotal);
      taxE.textContent = `${tax}`;

      // Calculate total amount
      const totalAmount = subtotal + tax;
      totalAmountE.textContent = `${totalAmount}`;
    }

    /**
     * Adds all the event listeners to the page
     */
    function addEventListeners() {
      checkoutBtnE.addEventListener("click", (e) => {
        localStorage.setItem("user_cart", "[]");
        alert("You have been checked out! Thanks for purchasing from Grosto");
      });
      backToShoppingBtnE.addEventListener("click", (e) => {
        window.location.href = "/";
      });
    }

    function DOMLoadedFunctions() {
      fillHTMLCart(userCart);
      calcCartSummary(userCart);
    }

    DOMLoadedFunctions();
    addEventListeners();
  });
})(CART, globalFunctions);
