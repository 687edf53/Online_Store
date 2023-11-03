// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let shopContainer = document.querySelector(".shop");
let shopContent = document.querySelector(".shop-content");
let shopTitle = document.querySelector(".section-title");
// Open Cart

let distance =
  window.innerWidth - (shopContainer.offsetWidth + cart.offsetWidth);
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
  updateTotal();
  shopContainer.style.margin = "3rem 0";
  shopContent.style.padding = "0 20px";
  shopContainer.style.alignItems = "center";
  shopContainer.style.width = window.innerWidth - cart.offsetWidth + "px";
  shopContent.style.width = window.innerWidth - cart.offsetWidth + "px";
  showData();
});

// Close Cart
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
  shopContent.style.width = "100%";
  shopContainer.style.margin = "3rem";
  if (document.body.clientWidth > 900) {
    shopContainer.style.alignItems = "center";
    shopContainer.style.width = "100%";
  } else {
    shopContainer.style.alignItems = "none";
    shopContainer.style.padding = "0";
    shopContainer.style.width = "fit-content";
  }
});

// Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  let quantityElements = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityElements.length; i++) {
    let input = quantityElements[i];
    input.addEventListener("input", quantityChanged);
  }
  // add To Cart
  let addCarts = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCarts.length; i++) {
    let button = addCarts[i];
    button.addEventListener("click", addCartItem);
  }
}

// remove Item from Cart
function removeCartItem(e) {
  if (cart.children[1].children.length === 0) {
    total = 0;
  }

  if (cart.children[1].children.length >= 4) {
    cart.children[1].style.height = "60vh";
  } else {
    cart.children[1].style.height = "fit-content";
  }
  let parentButton = e.target.parentElement;
  parentButton.remove();
  updateTotal();
  if (cart.children[1].children.length === 0) {
    total = 0;
  }
  for (let i = 0; i < dataPro.length; i++) {
    let title = parentButton.children[1].children[0].innerHTML;
    dataPro.splice(dataPro.indexOf(title), 1);
    localStorage.products = JSON.stringify(dataPro);
  }
  updateTotal();
  cartHeight();
}

// Quantity Changes
function quantityChanged(e) {
  let input = e.target;
  let title = e.target.parentElement.children[0].innerHTML;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  for (let i = 0; i < dataPro.length; i++) {
    if (dataPro[i].title === title) {
      dataPro[i].input = input.value;
      localStorage.products = JSON.stringify(dataPro);
    }
  }

  updateTotal();
}

// add To Cart
function addCartItem(e) {
  let button = e.target;
  let shopProducts = e.target.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

let dataPro;
if (localStorage.getItem("products")) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}

function showData() {
  let cartContent = document.querySelector(".cart-content");
  let cartBox;
  let allBoxes = "";
  for (let i = 0; i < dataPro.length; i++) {
    cartBox = `
     <div class="cart-box">
     <img src="${dataPro[i].img}" class="cart-img">
     <div class="detail-box">
     <div class="cart-product-title">${dataPro[i].title}</div>
     <div class="cart-price">${dataPro[i].price}</div>
     <input type="number" value="${+dataPro[i]
       .input}" min="1" class="cart-quantity">
     </div>
     <!-- Remove Cart -->
     <i class="bx bxs-trash-alt cart-remove"></i>
     </div>`;

    allBoxes += cartBox;
  }

  cartContent.innerHTML = allBoxes;

  for (let i = 0; i < cartContent.children.length; i++) {
    cartContent.children[i]
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartContent
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("input", quantityChanged);
  }
}
showData();

if (cart.children[1].children.length >= 4) {
  cart.children[1].style.height = "60vh";
} else {
  cart.children[1].style.height = "fit-content";
}

function addProductToCart(title, price, img) {
  cartHeight();
  let cartContent = document.querySelector(".cart-content");
  let cartBoxes = cartContent.querySelectorAll(".cart-box");

  // Check if the product is already in the cart
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let productTitle = cartBox.querySelector(".cart-product-title").textContent;

    if (productTitle === title) {
      alert("You already have this item in your cart.");
      return; // Exit the function without adding a duplicate item
    }
  }

  // Create a new cart item
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let input = 1;

  // Create an object to store the product details
  let product = {
    title: title,
    price: price,
    img: img,
    input: input,
  };

  // Add the product to the dataPro array
  dataPro.push(product);

  // Save the updated dataPro array to local storage
  localStorage.products = JSON.stringify(dataPro);

  // Create the HTML for the cart item
  cartShopBox.innerHTML = `
    <img src="${img}" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" min="1" class="cart-quantity">
    </div>
    <!-- Remove Cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>
  `;

  // Add event listeners to the new cart item
  cartShopBox
    .querySelector(".cart-remove")
    .addEventListener("click", removeCartItem);
  cartShopBox
    .querySelector(".cart-quantity")
    .addEventListener("input", quantityChanged);

  // Append the new cart item to the cart content
  cartContent.appendChild(cartShopBox);
  cartHeight();
}

function cartHeight() {
  if (cart.children[1].children.length >= 4) {
    cart.children[1].style.height = "60vh";
  } else {
    cart.children[1].style.height = "fit-content";
  }
}

cartHeight();

// Update Total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = `$${total}`;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 67) {
    cart.classList.toggle("active");
  }
});