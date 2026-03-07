import { cart, saveToLocalStorage } from './cart.js';


export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function updateDeliveryOption(productId, deliveryOptionId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });
  saveToLocalStorage();
}

export function calculateShippingCost() {
    let shippingCost = 0;
    cart.forEach((cartItem) => {
        deliveryOptions.forEach((option) => {
            if (option.id === cartItem.deliveryOptionId) {
                shippingCost += option.priceCents;
            }
        });
    });
    
    return shippingCost;
}