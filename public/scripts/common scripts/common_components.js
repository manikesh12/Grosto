(() => {
  //####################
  const nav = document.querySelector("nav");
  // const footer = document.querySelector("footer");
  nav.innerHTML = `<div class="company-logo no-events"><h1>GROSTO</h1></div><div class="pages"><ul><li id="home" class="nav-item"><a href="/" class="nav-link anchor">Home</a></li><li id="categories" class="nav-item"><a href="/pages/categories.html" class="nav-link anchor">Categories</a></li><li id="cart" class="nav-item"><a href="/pages/cart.html" class="nav-link anchor">Cart</a></li></ul></div>`;
  // footer.innerHTML = `<div class="footer-main">
  //  <div class="footer-contact">
  //    <div class="footer-logo">
  //      <h1 class="footer-logo company-logo no-select">GROSTO</h1>
  //    </div>
  //    <div class="footer-contact-information">
  //      <ul class="list footer-list footer-list-contact">
  //        <li class="list-item footer-list-item footer-list-item-contact">
  //          <img
  //            class="footer-contact-icon footer-contact-call-icon"
  //            src="/assests/icons/footer-icons/call-white.svg"
  //            alt="Call Icon"
  //          />
  //          <p id="telephone-number">+919843749299</p>
  //        </li>
  //        <li class="list-item footer-list-item footer-list-item-contact">
  //          <img
  //            class="footer-contact-icon footer-contact-email-icon"
  //            src="/assests/icons/footer-icons/email.svg"
  //            alt="Email Icon"
  //          />
  //          <p id="email"><span id="alias">manikeshponnam</span>@gmail.com</p>
  //        </li>
  //      </ul>
  //    </div>
  //  </div>
  //  <div class="footer-block-wrapper">
  //    <div class="footer-block-1">
  //      <ul class="list footer-list">
  //        <li class="list-item footer-list-item">
  //          <a class="anchor" href="/pages/categories">Categories</a>
  //        </li>
  //        <li class="list-item footer-list-item">
  //          <a class="anchor" href="/pages/cart">Cart</a>
  //        </li>
  //        <li class="list-item footer-list-item">
  //          <a class="anchor" href="#"
  //            >Contact & Suggestions</a
  //          >
  //        </li>
  //      </ul>
  //    </div>
  //    <div class="footer-block-2">
  //      <ul>
  //        <li class="list-item footer-list-item">
  //          <a class="anchor" href="#">About us</a>
  //        </li>
  //        <li class="list-item footer-list-item">
  //          <a
  //            class="anchor"
  //            href="/pages/legal/terms-of-service.html"
  //            target="_blank"
  //            >Terms & Conditions</a
  //          >
  //        </li>
  //        <li class="list-item footer-list-item">
  //          <a
  //            class="anchor"
  //            href="/pages/legal/privacy-policy.html"
  //            target="_blank"
  //            >Privacy Policy</a
  //          >
  //        </li>
  //      </ul>
  //    </div>
  //    <div class="footer-block-3">
  //      <ul>
  //        <li class="list-item footer-list-item-social">
  //          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
  //            <img
  //              id="youtube-icon"
  //              class="social-icon"
  //              src="/assests/icons/Social Media Icons/youtube.svg"
  //              alt="School's Youtube Page"
  //            />
  //          </a>
  //        </li>
  //        <li class="list-item footer-list-item-social">
  //          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
  //            <img
  //              id="twitter-icon"
  //              class="social-icon"
  //              src="/assests/icons/Social Media Icons/twitter.svg"
  //              alt="School's Twitter Page"
  //            />
  //          </a>
  //        </li>
  //        <li class="list-item footer-list-item-social">
  //          <a
  //            href="https://www.facebook.com"
  //            target="_blank"
  //            rel="noopener noreferrer"
  //          >
  //            <img
  //              id="facebook-icon"
  //              class="social-icon"
  //              src="/assests/icons/Social Media Icons/facebook.svg"
  //              alt="School's Facebook Page"
  //            />
  //          </a>
  //        </li>
  //        <li class="list-item footer-list-item-social">
  //          <a
  //            href="https://www.instagram.com"
  //            target="_blank"
  //            rel="noopener noreferrer"
  //          >
  //            <img
  //              id="instagram-icon"
  //              class="social-icon"
  //              src="/assests/icons/Social Media Icons/insta.svg"
  //              alt="School's Instagram Page"
  //            />
  //          </a>
  //        </li>
  //      </ul>
  //    </div>
  //  </div>
  // </div>
  // <div class="footer-copyright">
  //  <div class="privacy-policy">
  //   <a href="/pages/legal/privacy-policy.html" class="anchor terms-and-conditions">Privacy Policy</a>
  //  </div>
  //  <div class="copyright-text-wrapper">
  //    <p class="copyright-text">
  //      Copyright &copy; <span id="copyright-year"></span> u/<span
  //        id="alias"
  //        >unkn0wn</span
  //      >. All Rights Reserved.
  //    </p>
  //  </div>
  //  <div class="t&c-wrapper">
  //    <a
  //      href="/pages/legal/terms-of-service.html"
  //      class="anchor terms-and-conditions"
  //      >Terms & Conditions</a
  //    >
  //  </div>
  // </div>
  //   `;
  // Adds the blue highlight to the correct page in navigation

  const page_ids_meta = {
    "/": "home",
    "/pages/about_us.html": "about_us",
    "/pages/create_account.html": "create_account",
    "/pages/log_in.html": "log_in",
  };
  // Selects the nav, pages ul, gets pages list items as HTML collection
  const pagesList = document.querySelector(".pages>ul");
  const pagesListItems = pagesList.children;
  // Iterates through the pages list items until a match is found with the `nav id` and `list item id`
  for (let i = 0; i < pagesListItems.length; i++) {
    if (nav.id === pagesListItems[i].id) {
      // Then adds the appropriate CSS class to the elements to add the blue highlight
      pagesListItems[i].classList.add("current-nav-item");
      pagesListItems[i].children[0].classList.add("current-nav-link");
      break;
    }
  }
  //####################
})();
