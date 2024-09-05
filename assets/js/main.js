document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSection = document.getElementById('cart');

    // Smooth scroll to cart section on icon click
    cartIcon.addEventListener('click', function() {
        cartSection.scrollIntoView({ behavior: 'smooth' });
    });

    const products = [
        {
            id: 1,
            name: 'Jaguar',
            price: 1500,
            image: 'assets/img/product1.png'
        },
        {
            id: 2,
            name: 'versace',
            price: 1350,
            image: 'assets/img/product2.png'
        },
        {
            id: 3,
            name: 'giorgio',
            price: 870,
            image: 'assets/img/product3.png'
        },
        {
            id: 4,
            name: 'dunhill',
            price: 750,
            image: 'assets/img/product4.png'
        },
        {
            id: 5,
            name: 'dolce',
            price: 1950,
            image: 'assets/img/product5.png'
        },
        {
            id: 6,
            name: 'michael',
            price: 9180,
            image: 'assets/img/product6.png'
        },
        {
          id: 7,
          name: 'bvlgari',
          price: 8980,
          image: 'assets/img/product7.png'
        },
        {
          id: 8,
          name: 'versace pour',
          price: 980,
          image: 'assets/img/product8.png'
        }
    ];
    
    const productsContainer = document.getElementById('productsContainer');
    const cartContainer = document.getElementById('cartContainer');
    const cartItemsCount = document.getElementById('cartItemsCount');
    const cartTotal = document.getElementById('cartTotal');
    const buyNowButton = document.getElementById('buyNowButton');
    const logoutButton = document.getElementById('logoutButton');

    let cart = [];

    products.forEach(product => {
        const article = document.createElement('article');
        article.classList.add('products__card');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.classList.add('products__img');
        article.appendChild(img);

        const h3 = document.createElement('h3');
        h3.classList.add('products__title');
        h3.textContent = product.name;
        article.appendChild(h3);

        const span = document.createElement('span');
        span.classList.add('products__price');
        span.textContent = `Rs.${product.price}`;
        article.appendChild(span);

        const button = document.createElement('button');
        button.classList.add('products__button');
        button.innerHTML = `<i class='bx bx-shopping-bag'></i> Add to Cart`;
        button.addEventListener('click', function() {
            addToCart(product);
        });
        article.appendChild(button);

        productsContainer.appendChild(article);
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        saveCartToStorage(); // Save cart to localStorage
        renderCart();
        buyNowButton.style.display = 'inline-block'; // Show the Buy Now button
    }

    function renderCart() {
        cartContainer.innerHTML = '';
        cartItemsCount.textContent = `${cart.reduce((total, item) => total + item.quantity, 0)} items`;

        let totalPrice = 0;

        cart.forEach(item => {
            const article = document.createElement('article');
            article.classList.add('cart__card');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.classList.add('cart__img');
            article.appendChild(img);

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('cart__details');
            article.appendChild(detailsDiv);

            const h3 = document.createElement('h3');
            h3.classList.add('cart__title');
            h3.textContent = item.name;
            detailsDiv.appendChild(h3);

            const spanPrice = document.createElement('span');
            spanPrice.classList.add('cart__price');
            spanPrice.textContent = `Rs.${item.price}`;
            detailsDiv.appendChild(spanPrice);

            const amountDiv = document.createElement('div');
            amountDiv.classList.add('cart__amount');
            detailsDiv.appendChild(amountDiv);

            const amountContentDiv = document.createElement('div');
            amountContentDiv.classList.add('cart__amount-content');
            amountDiv.appendChild(amountContentDiv);

            const minusBox = document.createElement('span');
            minusBox.classList.add('cart__amount-box');
            minusBox.innerHTML = '<i class="bx bx-minus"></i>';
            minusBox.addEventListener('click', function() {
                removeFromCart(item.id);
            });
            amountContentDiv.appendChild(minusBox);

            const spanNumber = document.createElement('span');
            spanNumber.classList.add('cart__amount-number');
            spanNumber.textContent = item.quantity;
            amountContentDiv.appendChild(spanNumber);

            const plusBox = document.createElement('span');
            plusBox.classList.add('cart__amount-box');
            plusBox.innerHTML = '<i class="bx bx-plus"></i>';
            plusBox.addEventListener('click', function() {
                addToCart(item);
            });
            amountContentDiv.appendChild(plusBox);

            // Add the remove button
            const removeButton = document.createElement('button');
            removeButton.classList.add('cart__remove-button');
            removeButton.innerHTML = '<i class="bx bx-trash"></i>'; // Delete icon
            removeButton.addEventListener('click', function() {
                removeItemFromCart(item.id);
            });
            detailsDiv.appendChild(removeButton);

            totalPrice += item.price * item.quantity;

            cartContainer.appendChild(article);
        });

        cartTotal.textContent = `Rs.${totalPrice.toFixed(2)}`;
    }

    function removeFromCart(productId) {
        const index = cart.findIndex(item => item.id === productId);

        if (index !== -1) {
            const item = cart[index];
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }

            saveCartToStorage(); // Save cart to localStorage
            renderCart();
            if (cart.length === 0) {
                buyNowButton.style.display = 'none'; // Hide the Buy Now button if the cart is empty
            }
        }
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCartToStorage(); // Save cart to localStorage
        renderCart();
        if (cart.length === 0) {
            buyNowButton.style.display = 'none'; // Hide the Buy Now button if the cart is empty
        }
    }

    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            renderCart();
            if (cart.length > 0) {
                buyNowButton.style.display = 'inline-block'; // Show the Buy Now button if there are items in the cart
            }
        }
    }

    // Load cart from localStorage on page load
    loadCartFromStorage();

    // Handle Buy Now Button Click
    buyNowButton.addEventListener('click', function() {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    });

    // Add click event listener
    logoutButton.addEventListener('click', function() {
        // Redirect to login page
        window.location.href = 'login.html';
    });
});
