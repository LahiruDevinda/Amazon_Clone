class Cart{
    cartItems;
    #localStorageKey;

    constructor (localStorageKey){

        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();

    }

    #loadFromStorage(){
        this.cart.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

        if (!this.cart.cartItems) {
            this.cart.cartItems = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            },{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 2,
                deliveryOptionId: '2'
            }
            ];   
        }
    }

    saveToLocalStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, quantity, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((item) =>{
                if(item.productId === productId){
                    matchingItem = item;
                }    
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: deliveryOptionId
            });
        }

        this.saveToLocalStorage();

    }

    removeFromCart(productID) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productID) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;

        this.saveToLocalStorage();
    }

    updateCartQuantity() {

        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }

    itemsInCart() {
        let cartQuantity = this.cartItems.length;

        document.querySelector('.js-checkout-count').innerHTML = `${cartQuantity} items`;

        document.querySelector('.js-order-summery-items-count').innerHTML = `Items (${cartQuantity}):`;
    }

    calculateCartTotal() {
        let cartTotal = 0;
        this.cartItems.forEach((cartItem) => {
            products.forEach((product) => {
            if (product.id === cartItem.productId) {
                cartTotal += product.priceCents * cartItem.quantity;
            }
            });
        });
        return cartTotal;
    }
}

const cart = new Cart('cart-oop');
const bussinessCart = new Cart('business-cart');


console.log(cart);
console.log(bussinessCart);

