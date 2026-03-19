import { cart, removeFromCart, itemsInCart,loadCart, updateCartQuantity, clearCart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import { orderSummery } from '../utils/orderSummery.js';
import { updateDeliveryOption } from '../data/deliveryOptions.js';
import { setDeliveryDate, setDeliveryDateTitle } from '../utils/deliveryDate.js';
import { addOrder } from '../data/orders.js';

function render() {
    let cartSummerHTML = '';

    cart.forEach((cartItem) => {

        const productID = cartItem.productId;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productID) {
                matchingProduct = product;
            }
        });

        cartSummerHTML += 
        `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date-title" data-product-id="${matchingProduct.id}">
                
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    ${cartItem.deliveryOptionId === '1' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="1"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date js-delivery-option-one-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    ${cartItem.deliveryOptionId === '2' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="2"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date js-delivery-option-two-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    ${cartItem.deliveryOptionId === '3' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="3"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date js-delivery-option-three-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>`;
    });
    document.querySelector('.js-order-summery').innerHTML = cartSummerHTML;
    orderSummery();

    itemsInCart();

    setDeliveryDate();

    document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            
            const productID = deleteLink.dataset.productId; 
            removeFromCart(productID);
            const container =document.querySelector(`.js-cart-item-container-${productID}`);
            container.remove();

            itemsInCart();
            orderSummery();
        });

    });

    document.querySelectorAll('.js-delivery-option').forEach((option) => {
        option.addEventListener('click', () => {
            const productID = option.dataset.productId;
            const deliveryOptionId = option.dataset.deliveryOptionId;
            updateDeliveryOption(productID, deliveryOptionId);
            orderSummery();
            setDeliveryDateTitle(productID);
        });
    });

    document.querySelectorAll('.js-delivery-date-title').forEach((title) => {
        const productID = title.dataset.productId;
        setDeliveryDateTitle(productID);
    });

    document.querySelector('.js-place-order-button').addEventListener('click', async() => {
        if(cart.length>0){
            try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                cart: cart
            })
        });
       
        const order = await response.json();
        addOrder(order);

        clearCart();
        
        window.location.href = 'orders.html';
        
        }catch(error){
            console.log('Unexpected error.')
        }
        
        }else{
            console.log('Cart is empty.');
        }
    });
}

async function loadPage() {
    try{
        await loadProductsFetch();

        const value = await new Promise((resolve) => {
            loadCart(() => {
                resolve();
            });
        });
    }catch (error){
        console.log("Unexpected error.")
    }
    render();
}

loadPage();

/*
Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then(() => {
    render();
});
*/
/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    render();
}); */
/*
loadProducts(() => {
    let cartSummerHTML = '';

    cart.forEach((cartItem) => {

        const productID = cartItem.productId;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productID) {
                matchingProduct = product;
            }
        });

        cartSummerHTML += 
        `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date-title" data-product-id="${matchingProduct.id}">
                
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    ${cartItem.deliveryOptionId === '1' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="1"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date js-delivery-option-one-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    ${cartItem.deliveryOptionId === '2' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="2"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date js-delivery-option-two-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    ${cartItem.deliveryOptionId === '3' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="3"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date js-delivery-option-three-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>`;
    });
    document.querySelector('.js-order-summery').innerHTML = cartSummerHTML;
    orderSummery();

    itemsInCart();

    setDeliveryDate();

    document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            
            const productID = deleteLink.dataset.productId; 
            removeFromCart(productID);
            const container =document.querySelector(`.js-cart-item-container-${productID}`);
            container.remove();

            itemsInCart();
            orderSummery();
        });

    });

    document.querySelectorAll('.js-delivery-option').forEach((option) => {
        option.addEventListener('click', () => {
            const productID = option.dataset.productId;
            const deliveryOptionId = option.dataset.deliveryOptionId;
            updateDeliveryOption(productID, deliveryOptionId);
            orderSummery();
            setDeliveryDateTitle(productID);
        });
    });

    document.querySelectorAll('.js-delivery-date-title').forEach((title) => {
        const productID = title.dataset.productId;
        setDeliveryDateTitle(productID);
    });
});
*/
/*
loadProducts(() => {
    loadCart(() => {
    render();
    });
});
*/

