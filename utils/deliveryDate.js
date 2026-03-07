import { deliveryOptions } from '../data/deliveryOptions.js';
import { cart } from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();

export function setDeliveryDate() {
    
    const optionOneDeliveryDate = today.add(deliveryOptions[0].deliveryDays, 'day').format('dddd, MMMM D');
    const optionTwoDeliveryDate = today.add(deliveryOptions[1].deliveryDays, 'day').format('dddd, MMMM D');
    const optionThreeDeliveryDate = today.add(deliveryOptions[2].deliveryDays, 'day').format('dddd, MMMM D');

    document.querySelector('.js-delivery-option-one-date').innerHTML = optionOneDeliveryDate;
    document.querySelector('.js-delivery-option-two-date').innerHTML = optionTwoDeliveryDate;
    document.querySelector('.js-delivery-option-three-date').innerHTML = optionThreeDeliveryDate;
}

export function setDeliveryDateTitle(productId){
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem.deliveryOptionId === '1') {
        const optionOneDeliveryDate = today.add(deliveryOptions[0].deliveryDays, 'day').format('dddd, MMMM D');
        document.querySelector(`.js-delivery-date-title[data-product-id="${productId}"]`).innerHTML = `Delivery date: ${optionOneDeliveryDate}`;
    }
    else if (cartItem.deliveryOptionId === '2') {
        const optionTwoDeliveryDate = today.add(deliveryOptions[1].deliveryDays, 'day').format('dddd, MMMM D');
        document.querySelector(`.js-delivery-date-title[data-product-id="${productId}"]`).innerHTML = `Delivery date: ${optionTwoDeliveryDate}`;
    }
    else if (cartItem.deliveryOptionId === '3') {
        const optionThreeDeliveryDate = today.add(deliveryOptions[2].deliveryDays, 'day').format('dddd, MMMM D');
        document.querySelector(`.js-delivery-date-title[data-product-id="${productId}"]`).innerHTML = `Delivery date: ${optionThreeDeliveryDate}`;
    }
}