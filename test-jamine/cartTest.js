import { addToCart, cart, loadFromStorage } from '../data/cart.js'
import { loadProducts } from '../data/products.js'

describe('test suite: addToCart', () => {
    beforeAll((done) => {
        loadProducts();
        done();
    });

    it('add an existing item to the cart', () => {

        spyOn(localStorage, 'setItem')

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    it('add a new item to the cart', () => {});
});
