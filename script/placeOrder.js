import { formatCurrency } from "../utils/money.js";
import { orders } from "../data/orders.js";
import { products,loadProductsFetch } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";
import { formatOrderDate } from "../utils/dateFormat.js";

loadProductsFetch().then(() => {
    
    renderOrders();
    updateCartQuantity(); 
});

function renderOrders(){
    let html = '';

    orders.forEach((order) => {
        let productListHTML = '';
        
        order.products.forEach((product) => {
            const matchedItem = products.find((item) => item.id === product.productId);
            
            if(matchedItem){
               const name = matchedItem.name;
               const image = matchedItem.image;

               // CRITICAL: Image, Details, AND Actions must all be inside this string
               productListHTML += `
                    <div class="product-image-container">
                        <img src="${image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                            ${name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${formatOrderDate(product.estimatedDeliveryTime)}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${product.quantity}
                        </div>
                        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchedItem.id}">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div> 

                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </a>
                    </div>
                `;
            }
        });

        html += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${formatOrderDate(order.orderTime)}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${productListHTML}
            </div>  
        </div>
        `;
    });

    document.querySelector('.js-order-grid').innerHTML = html;

    document.querySelectorAll('.js-buy-again-button').forEach((buyAgain) => {
        buyAgain.addEventListener('click', () => { 
            
            const productID = buyAgain.dataset.productId; 
            addToCart(productID,1,'1');
            updateCartQuantity();
        });

    });;

}

