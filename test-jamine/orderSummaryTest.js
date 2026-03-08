import { orderSummery } from "../utils/orderSummery.js";
import { loadFromStorage } from "../data/cart.js";


describe('test suite: orderSummary', () => {
    it('display the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-payment-summery-total"></div>
            <div class="js-payment-summery-shipping"></div>
            <div class="js-payment-summery-subtotal"></div>
            <div class="js-payment-summery-tax"></div>
            <div class="js-payment-order-total"></div>
            
            <div class="js-return-to-home-link"></div> 
            <div class="js-cart-quantity"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                },{
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]);
        });
        
        loadFromStorage();

        orderSummery();

        expect(document.querySelector('.js-payment-summery-total').innerHTML).toEqual('$52.80');
        expect(document.querySelector('.js-payment-summery-shipping').innerHTML).toEqual('$4.99');
        expect(document.querySelector('.js-payment-summery-subtotal').innerHTML).toEqual('$57.79');
        expect(document.querySelector('.js-payment-summery-tax').innerHTML).toEqual('$5.78');
        expect(document.querySelector('.js-payment-order-total').innerHTML).toEqual('$63.57');
    })
});