function FirstPageLoad() {
  this.setEmptyCart = function () {
    if (localStorage.getItem("user_cart") === null) {
      localStorage.setItem("user_cart", JSON.stringify([]));
    }
  };
  this.printStuff = function () {
    // console.log(localStorage);
  };
  this.execute = function () {
    this.setEmptyCart();
    this.printStuff();
  };
}
function GlobalFunctions(firstPageLoad) {
  this.setEmptyCart = firstPageLoad.setEmptyCart;
}

const firstPageLoad = new FirstPageLoad();
const globalFunctions = new GlobalFunctions(firstPageLoad);
let globalVariable = {};

export { globalVariable, firstPageLoad, globalFunctions };
