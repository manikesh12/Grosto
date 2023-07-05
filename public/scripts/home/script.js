(() => {
  // const iframe = document.querySelector("iframe");
  // const height = localStorage.getItem("nav_height");
  // iframe.style.height = height;
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
  productsData = [
    {
      id: 123,
      name: "Broccoli",
      imageLocation: "/media/grocery items pics/Brocoli--medium.jpg",
      price: 150,
      tags: ["vegetable", "treelike", "green", "spherical", "produce"],
    },
    {
      id: 124,
      name: "Carrot",
      imageLocation: "/media/grocery items pics/carrot--large_01.jpg",
      price: 65,
      tags: ["vegetable", "treelike", "orange", "long", "produce"],
    },
    {
      id: 125,
      name: "Beans",
      imageLocation: "/media/grocery items pics/beans--medium.jpg",
      price: 100,
      tags: ["vegetable", "leafy", "green", "spherical", "produce"],
    },
    {
      id: 213,
      name: "Mango",
      imageLocation: "/media/fruits/mango--med.jpg",
      price: 180,
      tags: ["vegetable", "green", "long", "produce"],
    },
    {
      id: 215,
      name: "Banana",
      imageLocation: "/media/fruits/banana--med.jpg",
      price: 40,
      tags: ["vegetable", "red", "spherical", "produce"],
    },
    {
      id: 302,
      name: "Rice",
      imageLocation: "/media/grains/rice--med.webp",
      price: 100,
      tags: ["vegetable", "red", "spherical", "produce"],
    },
  ];

  const productSection = document.querySelector(".products__container");

  productsData.forEach((productData) => {
    // console.log(productSection);
    productCard = document.createElement("div");
    productCard.setAttribute("class", "product-card");
    productCard.innerHTML = innerCardContent(
      productData.id,
      productData.name,
      productData.imageLocation,
      productData.price,
      productData.tags
    );
    productSection.appendChild(productCard);
  });
})();
