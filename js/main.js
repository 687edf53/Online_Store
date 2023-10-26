// Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// Open Cart
cartIcon.addEventListener('click', () => {
  cart.classList.add('active')
})

// Close Cart
closeCart.addEventListener('click', () => {
  cart.classList.remove('active')
})

// Cart Working JS
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  let removeCartButtons = document.getElementsByClassName('cart-remove')
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
  }
  let quantityElements = document.getElementsByClassName('cart-quantity')
  for (let i = 0; i < quantityElements.length; i++) {
    let input = quantityElements[i];
    input.addEventListener('input', quantityChanged)
  }
  // add To Cart
  let addCarts = document.getElementsByClassName('add-cart')
  for (let i = 0; i < addCarts.length; i++) {
    let button = addCarts[i];
    button.addEventListener('click', addCartItem)
  }
}

// remove Item from Cart
function removeCartItem(e) {
  let parentButton = e.target.parentElement
  parentButton.remove()
  updateTotal()
}

// Quantity Changes
function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateTotal()
}

// add To Cart
function addCartItem(e) {
  let button = e.target;
  let shopProducts = e.target.parentElement;
  let title = shopProducts.getElementsByClassName('product-title')[0].innerText
  let price = shopProducts.getElementsByClassName('price')[0].innerText
  let productImg = shopProducts.getElementsByClassName('product-img')[0].src
  addProductToCart(title, price, productImg);
  updateTotal()
}


function addProductToCart(title, price, img) {
  let cartShopBox = document.createElement('div')
  cartShopBox.classList.add('cart-box')
  let cartItems = document.getElementsByClassName('cart-content')[0]
  let cartItemsNames = cartItems.getElementsByClassName('cart-product-title')

  for (let i = 0; i < cartItemsNames.length; i++) {
    alert('You Have already add this item to cart')
  }
  let cartBoxContent = `
    <img src="${img}" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" min="1" class="cart-quantity">
    </div>
    <!-- Remove Cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>`

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('input', quantityChanged)
}

// Update Total 
function updateTotal() {
  let cartContent = document.getElementsByClassName('cart-content')[0]
  let cartBoxes = cartContent.getElementsByClassName('cart-box')
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i]
    let priceElement = cartBox.getElementsByClassName('cart-price')[0]
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
    let price = parseFloat(priceElement.innerText.replace('$', ""))
    let quantity = quantityElement.value
    total = total + (price * quantity);

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = `$${total}`
  }

}