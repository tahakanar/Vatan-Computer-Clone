const swiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 15,
  slidesPerGroup: 3,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
    },

    900: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});

const contain = document.querySelector(".contain");
const image = document.querySelector(".image");

//* Sticky

const initialCoords = image.getBoundingClientRect();

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) contain.classList.add("sticky");
  else contain.classList.remove("sticky");
});

$(() => {
  $.get("bestSeller.json").then(result => {
    itemCount = result.length;
    for (var i = 0; i < result.length; i++) {
      if (result[i].code === "4UK80EA") {
        var product = `
      <div class="product">
        <div class="web-1">${result[i].attr5 ? result[i].attr5 : ""}</div>
        <div class=" product-1">
          <img src="${result[i].img}" class="img"/>
          <div class="star">
            <span class="star-text"><i class="fas fa-star"></i>4,6</span
            ><span class="comment">(122 Yorum)</span>
          </div>
          <small class="code">PA2N0006TR</small>
          <p class="title">${result[i].title}</p>

          <div class="price-text">₺${result[i].price}</div>
          <div class="left-2">${result[i].attr10 ? result[i].attr10 : ""}</div>

          </div>
          <button class="btn addBasket-btn" data-id="${
            result[i].code
          }" data-name="${result[i].title}" data-image="${
          result[i].img
        }" data-price="${result[i].price}">
            <span class="btn-visible">Bugün kargoda</span>
            <span class="btn-invisible"><i class="fas fa-angle-double-right icon-arrow"></i><span class="sepet" id="${
              result[i].code
            }">Sepete Ekle</span></span>
          </button>
      </div>
      `;

        $(".related-products").append(product);
      } else {
        var product = `
        <div class="product">
          <div class="web">${result[i].attr5 ? result[i].attr5 : ""}</div>
          <div class=" product-1">
            <img src="${result[i].img}" class="img"/>
            <div class="d-flex star">
              <span class="star-text"><i class="fas fa-star"></i>4,6</span
              ><span class="comment">(122 Yorum)</span>
            </div>
            <small class="code">PA2N0006TR</small>
            <p class="title">${result[i].title}</p>
  
            <div class="price-text">₺${result[i].price}</div>
            <div class="left-2">${
              result[i].attr10 ? result[i].attr10 : ""
            }</div>
  
            </div>
            <button class="btn addBasket-btn" data-id="${
              result[i].code
            }" data-name="${result[i].title}" data-image="${
          result[i].img
        }" data-price="${result[i].price}">
            <span class="btn-visible">Bugün kargoda</span>
            <span class="btn-invisible"><i class="fas fa-angle-double-right icon-arrow"></i><span class="sepet" id="${
              result[i].code
            }">Sepete Ekle</span></span>
          </button>
        </div>
        `;

        $(".related-products").append(product);
      }
    }
  });

  var itemCount = 0;
});

$(() => {
  $.get("relatedProducts.json").then(data => {
    itemCount1 = data.length;
    for (var i = 0; i < data.length; i++) {
      var product1 = `
      <div class="swiper-slide product">
        <div class="web">${data[i].attr5 ? data[i].attr5 : ""}</div>
        <div class=" product-1">
          <img src="${data[i].img}" class="img"/>
          <div class="d-flex star">
            <span class="star-text"><i class="fas fa-star"></i>4,6</span
            ><span class="comment">(122 Yorum)</span>
          </div>
          <small class="code">PA2N0006TR</small>
          <p class="title">${data[i].title}</p>

          <div class="price-text">₺${data[i].price}</div>
          </div>
          <div class="shipping-second">Bugün kargoda</div>
      </div>
      `;

      $(".js-swiper-wrapper-second").append(product1);
    }
    const swiper1 = new Swiper(".js-swiper-container-second", {
      slidesPerView: 5,
      spaceBetween: 0,
      loop: true,

      navigation: {
        nextEl: ".js-next",
        prevEl: ".js-prev",
      },

      breakpoints: {
        320: {
          slidesPerView: 2,
        },

        640: {
          slidesPerView: 3,
        },

        900: {
          slidesPerView: 4,
        },

        1200: {
          slidesPerView: 4,
        },
        1800: {
          slidesPerView: 5,
        },
      },
    });
  });

  var itemCount1 = 0;
});

const form = document.querySelector(".btn-search_1");
const formControl = document.querySelector(".form-control");

form.addEventListener("click", () => form.classList.toggle("active"));

$(formControl).on("click", function () {
  $(formControl).attr("placeholder", "Ürün ara");
});

//*********************************************************************** */

if (localStorage.cart) {
  var cart = JSON.parse(localStorage.cart);
  for (var i = 0; i < cart.length; i++) {
    AddItemToMiniBasket(cart[i]);
  }
}

$(() => {
  jQuery(document).on("click", ".addBasket-btn .btn-invisible", function () {
    var thisItem = jQuery(this).parents(".addBasket-btn");
    var clickedProduct = {
      id: thisItem.attr("data-id"),
      name: thisItem.attr("data-name"),
      image: thisItem.attr("data-image"),
      price: Number(thisItem.attr("data-price")),
    };
    AddToMiniBasket(clickedProduct);
  });

  jQuery(document).on("click", ".basket-remove", function () {
    var thisItemId = jQuery(this).attr("data-id");
    RemoveToBasket(thisItemId);
  });

  function AddToMiniBasket(product) {
    AddItemToMiniBasket(product);

    var tempCart = [];
    if (localStorage.cart != undefined) {
      tempCart = JSON.parse(localStorage.cart);
    }
    tempCart.push(product);
    localStorage.cart = JSON.stringify(tempCart);
  }
});

function RemoveToBasket(id) {
  jQuery(".basket-product").each(function () {
    if (jQuery(this).attr("data-id") == id) {
      jQuery(this).remove();
    }
  });

  var tempCart = JSON.parse(localStorage.cart);
  for (var i = 0; i < tempCart.length; i++) {
    if (tempCart[i].id == id) {
      tempCart.splice(i, 1);
    }
  }
  localStorage.cart = JSON.stringify(tempCart);
}

function AddItemToMiniBasket(product) {
  var productHTML = `
                  <div class="basket-product drop-1 dropdown-item" data-id="${product.id}">
                    <div class="d-flex align-items-center">
                      <button class="basket-remove" data-id="${product.id}"> <i class="fa fa-times"></i> </button>
                      <img src="${product.image}" alt="" class="phone-image" />
                      <div class="phone-total">
                        <div class="phone-name">${product.name}</div>
                        <div class="phone-price">₺${product.price}</div>
                      </div>
                    </div>
                  </div>
      `;
  $(".mini-basket-products").append(productHTML);
}
