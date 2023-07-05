// import {  } from './';
(() => {
  const categoriesEs = Array.from(document.querySelectorAll(".category-card"));
  console.log(categoriesEs);
  categoriesEs.forEach((categoryCardE) => {
    categoryCardE.addEventListener("click", (e) => {
      addClickEvent(e, categoryCardE);
    });
    const result = categoryCardE.getAttribute("data-category");
    console.log(result);
  });
  function addClickEvent(e, categoryCardE) {
    // console.log(e.target);
    const category = categoryCardE.getAttribute("data-category");
    // console.log(categoryCardE.getAttribute);
    // console.log(`${window.location.host}/category_page/${category}`);
    // window.location.href = `https://google.com`;
    // console.log(`${window.location.host}/category_page/${category}`);
    window.location.href = `/category_page/${category}`;
  }
})();
