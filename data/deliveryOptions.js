import { cart } from './cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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

export function setDeliveryDate() {
    const today = dayjs();
    const optionOneDeliveryDate = today.add(deliveryOptions[0].deliveryDays, 'day').format('dddd, MMMM D');
    const optionTwoDeliveryDate = today.add(deliveryOptions[1].deliveryDays, 'day').format('dddd, MMMM D');
    const optionThreeDeliveryDate = today.add(deliveryOptions[2].deliveryDays, 'day').format('dddd, MMMM D');

    document.querySelector('.js-delivery-option-one-date').innerHTML = optionOneDeliveryDate;
    document.querySelector('.js-delivery-option-two-date').innerHTML = optionTwoDeliveryDate;
    document.querySelector('.js-delivery-option-three-date').innerHTML = optionThreeDeliveryDate;
}