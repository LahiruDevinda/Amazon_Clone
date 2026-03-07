import { calculateCartTotal } from "../data/cart.js";
import { calculateShippingCost } from "../data/deliveryOptions.js";
import { formatCurrency } from "./money.js";

export function orderSummery(){
    const cartTotal = calculateCartTotal();
    const shippingCost = calculateShippingCost();
    const subtotal = cartTotal + shippingCost;
    const tax = subtotal * 0.1;

    document.querySelector('.js-payment-summery-total')
    .innerHTML = `$${formatCurrency(cartTotal)}`;
    
    document.querySelector('.js-payment-summery-shipping')
    .innerHTML = `$${formatCurrency(shippingCost)}`;

    document.querySelector('.js-payment-summery-subtotal')
    .innerHTML = `$${formatCurrency(subtotal)}`;

    document.querySelector('.js-payment-summery-tax')
    .innerHTML = `$${formatCurrency(tax)}`;

    document.querySelector('.js-payment-order-total')
    .innerHTML = `$${formatCurrency(subtotal + tax)}`;
}