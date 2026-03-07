export let cart = JSON.parse(localStorage.getItem('cart'));

export function addToCart(productId){
  let matchingItem;

  cart.forEach((item) =>{
          if(item.productId === productId){
              matchingItem = item;
          }    
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
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

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}