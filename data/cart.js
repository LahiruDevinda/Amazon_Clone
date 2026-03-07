import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
    cart = [];
}

export function addToCart(productId, quantity, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) =>{
          if(item.productId === productId){
              matchingItem = item;
          }    
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: deliveryOptionId
    });
  }

  saveToLocalStorage();

}

export function updateCartQuantity() {

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function removeFromCart(productID) {
  const newCart = [];
  cart.forEach((cartItem) => {
      if (cartItem.productId !== productID) {
          newCart.push(cartItem);
      }
  });
  cart = newCart;

  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function itemsInCart() {
  let cartQuantity = cart.length;

  document.querySelector('.js-checkout-count').innerHTML = `${cartQuantity} items`;

  document.querySelector('.js-order-summery-items-count').innerHTML = `Items (${cartQuantity}):`;
}

export function calculateCartTotal() {
  let cartTotal = 0;
  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        cartTotal += product.priceCents * cartItem.quantity;
      }
    });
  });
  return cartTotal;
}