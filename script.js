/**
 * AilZaCafe - Laboratory 6: DOM Scripting
 * Dynamic E-commerce Application with Vanilla JavaScript
 * @module script
 */

// ============================================================================
// DATA STRUCTURE - Product Class & Product Array
// ============================================================================

/**
 * Product class representing items in the coffee shop
 * @class
 */
class Product {
    constructor(id, name, price, image, type, roast, rating, description = '') {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.type = type || 'coffee';
        this.roast = roast || 'medium';
        this.rating = rating || 4.5;
        this.description = description || 'Experience the perfect blend of premium coffee beans, roasted to bring out the best flavors.';
    }
}

/**
 * Products Array - 10+ test products for the coffee shop
 * @constant {Product[]}
 */
const products = [
    new Product(1, 'House Blend', 35, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'espresso', 'medium', 4.5, 'Our signature house blend coffee, carefully roasted to perfection. Features notes of chocolate and nuts with a smooth finish.'),
    new Product(2, 'Espresso Roast', 50, 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400', 'espresso', 'dark', 4.8, 'Bold and intense espresso roast, perfect for your morning pick-me-up. Rich crema and deep chocolate notes.'),
    new Product(3, 'French Vanilla', 39, 'https://images.unsplash.com/photo-1511920174518-f2637b8c8e2b?w=400', 'latte', 'medium', 4.3, 'Sweet and creamy vanilla-infused coffee. A delightful treat for any time of day.'),
    new Product(4, 'Caramel Macchiato', 40, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', 'latte', 'light', 4.6, 'Layered espresso with vanilla and caramel drizzle. A customer favorite!'),
    new Product(5, 'Hazelnut Blend', 60, 'https://images.unsplash.com/photo-1462917882517-e150004695fa?w=400', 'cappuccino', 'medium', 4.4, 'Nutty and aromatic hazelnut-infused coffee. Smooth and satisfying.'),
    new Product(6, 'Mocha Delight', 55, 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400', 'mocha', 'dark', 4.7, 'Chocolate lovers dream! Rich mocha flavor combined with premium espresso.'),
    new Product(7, 'Colombian Supreme', 80, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 'americano', 'medium', 4.9, 'Single-origin Colombian beans. Smooth, balanced, with hints of citrus.'),
    new Product(8, 'Ethiopian Yirgacheffe', 69, 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=400', 'espresso', 'light', 4.8, 'Floral and tea-like with bright acidity. A specialty coffee experience.'),
    new Product(9, 'Irish Cream', 45, 'https://images.unsplash.com/photo-1462917882517-e150004695fa?w=400', 'latte', 'medium', 4.6, 'Smooth Irish cream flavor with hints of whiskey and vanilla.'),
    new Product(10, 'Pumpkin Spice', 48, 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400', 'latte', 'medium', 4.7, 'Seasonal favorite with warm pumpkin and spice notes.'),
    new Product(11, 'Cold Brew', 42, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'coldbrew', 'dark', 4.5, 'Smooth, low-acid cold brew. Steeped for 24 hours for maximum flavor.'),
    new Product(12, 'Decaf Swiss Water', 38, 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400', 'espresso', 'medium', 4.3, 'Chemical-free decaf that doesn\'t compromise on taste.')
];

// ============================================================================
// GLOBAL STATE MANAGEMENT
// ============================================================================

/**
 * Shopping cart array - stores items added by user
 * Each item: { productId, name, price, quantity, image }
 * @type {Array}
 */
let cart = [];

/**
 * Current logged-in user object
 * @type {Object|null}
 */
let currentUser = null;

/**
 * User's wishlist
 * @type {Array}
 */
let wishlist = [];

/**
 * All registered users
 * @type {Array}
 */
let users = [];

/**
 * All orders placed by users
 * @type {Object}
 */
let allOrders = {};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Load all data from localStorage
 */
function loadData() {
    // Load cart
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    // Load current user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    // Load users
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
    
    // Load all orders
    const savedOrders = localStorage.getItem('allOrders');
    if (savedOrders) {
        allOrders = JSON.parse(savedOrders);
    }
    
    // Load wishlists
    const savedWishlists = localStorage.getItem('wishlists');
    if (savedWishlists && currentUser) {
        const allWishlists = JSON.parse(savedWishlists);
        wishlist = allWishlists[currentUser.email] || [];
    }
}

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Save user data to localStorage
 */
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
}

/**
 * Save wishlist data
 */
function saveWishlist() {
    if (currentUser) {
        const allWishlists = JSON.parse(localStorage.getItem('wishlists')) || {};
        allWishlists[currentUser.email] = wishlist;
        localStorage.setItem('wishlists', JSON.stringify(allWishlists));
    }
}

/**
 * Show notification/toast message
 * @param {string} message - Message to display
 * @param {string} type - 'success', 'error', or 'info'
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 24px',
        backgroundColor: type === 'success' ? '#2e7d32' : (type === 'error' ? '#c62828' : '#E5781E'),
        color: 'white',
        borderRadius: '8px',
        zIndex: '2000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideInRight 0.3s ease',
        cursor: 'pointer'
    });
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Click to dismiss
    notification.addEventListener('click', () => notification.remove());
}

/**
 * Add fade-in animation to an element
 * @param {HTMLElement} element - Element to animate
 */
function addFadeInAnimation(element) {
    element.classList.add('fade-in-animation');
    setTimeout(() => {
        element.classList.remove('fade-in-animation');
    }, 600);
}

// ============================================================================
// TASK 2: DYNAMIC PRODUCT RENDERING (products.html)
// ============================================================================

/**
 * Renders all products dynamically on the products page
 * Uses createElement, textContent, and appendChild for DOM manipulation
 */
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    // Clear existing content
    productGrid.innerHTML = '';
    
    // Use forEach to iterate through products array
    products.forEach(product => {
        // Create article element for product card
        const article = document.createElement('article');
        article.setAttribute('data-product-id', product.id);
        article.className = 'product-card';
        
        // Create and configure image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';
        
        // Create product details div
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'product-details';
        
        // Create product name
        const nameEl = document.createElement('h3');
        nameEl.textContent = product.name;
        
        // Create price element
        const priceEl = document.createElement('p');
        priceEl.className = 'price';
        priceEl.textContent = `₱${product.price}`;
        
        // Create rating element
        const ratingEl = document.createElement('div');
        ratingEl.className = 'rating';
        ratingEl.innerHTML = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        ratingEl.style.color = '#FBBA00';
        ratingEl.style.marginBottom = '10px';
        
        // Create View Details button
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'View Details';
        viewBtn.className = 'view-details';
        viewBtn.setAttribute('data-id', product.id);
        
        // Create Add to Cart button with data-id attribute
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.setAttribute('data-id', product.id);
        addToCartBtn.setAttribute('data-name', product.name);
        addToCartBtn.setAttribute('data-price', product.price);
        addToCartBtn.setAttribute('data-image', product.image);
        
        // Create Wishlist button
        const wishlistBtn = document.createElement('button');
        const isInWishlist = wishlist.some(item => item.id === product.id);
        wishlistBtn.textContent = isInWishlist ? '❤️ In Wishlist' : '🤍 Wishlist';
        wishlistBtn.className = `wishlist-btn ${isInWishlist ? 'active' : ''}`;
        wishlistBtn.setAttribute('data-id', product.id);
        
        // Append all elements
        detailsDiv.appendChild(nameEl);
        detailsDiv.appendChild(priceEl);
        detailsDiv.appendChild(ratingEl);
        detailsDiv.appendChild(viewBtn);
        detailsDiv.appendChild(addToCartBtn);
        detailsDiv.appendChild(wishlistBtn);
        
        article.appendChild(img);
        article.appendChild(detailsDiv);
        
        productGrid.appendChild(article);
    });
}

/**
 * Handles product filtering based on selected filters
 * Uses filter() method to dynamically filter products
 */
function setupProductFilters() {
    const filterInputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    if (!filterInputs.length) return;
    
    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            applyFilters();
        });
    });
    
    // Setup clear filters button
    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
}

/**
 * Apply active filters to products and re-render
 * Uses filter() array method for product filtering
 */
function applyFilters() {
    const productContainer = document.querySelector('.product-grid');
    if (!productContainer) return;
    
    // Get selected filters
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
    const selectedPrice = document.querySelector('input[name="price"]:checked')?.value;
    const selectedRoasts = Array.from(document.querySelectorAll('input[name="roast"]:checked')).map(cb => cb.value);
    const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => parseInt(cb.value));
    
    // Filter products using Array.filter()
    let filteredProducts = products.filter(product => {
        // Filter by type
        if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) {
            return false;
        }
        
        // Filter by price
        if (selectedPrice) {
            const [min, max] = selectedPrice.split('-').map(Number);
            if (product.price < min || product.price > max) {
                return false;
            }
        }
        
        // Filter by roast
        if (selectedRoasts.length > 0 && !selectedRoasts.includes(product.roast)) {
            return false;
        }
        
        // Filter by rating
        if (selectedRatings.length > 0) {
            const maxRating = Math.max(...selectedRatings);
            if (product.rating < maxRating) {
                return false;
            }
        }
        
        return true;
    });
    
    // Re-render filtered products
    const productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = `Showing ${filteredProducts.length} products`;
    }
    
    // Clear and re-render
    productContainer.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const article = createProductCard(product);
        productContainer.appendChild(article);
    });
    
    if (filteredProducts.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-state';
        emptyMsg.textContent = 'No products match your filters.';
        productContainer.appendChild(emptyMsg);
    }
}

/**
 * Create a single product card element
 * @param {Product} product - Product object
 * @returns {HTMLElement} - Article element for product card
 */
function createProductCard(product) {
    const article = document.createElement('article');
    article.setAttribute('data-product-id', product.id);
    
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';
    
    const nameEl = document.createElement('h3');
    nameEl.textContent = product.name;
    
    const priceEl = document.createElement('p');
    priceEl.className = 'price';
    priceEl.textContent = `₱${product.price}`;
    
    const ratingEl = document.createElement('div');
    ratingEl.className = 'rating';
    ratingEl.innerHTML = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    ratingEl.style.color = '#FBBA00';
    
    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View Details';
    viewBtn.className = 'view-details';
    viewBtn.setAttribute('data-id', product.id);
    
    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.className = 'add-to-cart-btn';
    addToCartBtn.setAttribute('data-id', product.id);
    addToCartBtn.setAttribute('data-name', product.name);
    addToCartBtn.setAttribute('data-price', product.price);
    addToCartBtn.setAttribute('data-image', product.image);
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const wishlistBtn = document.createElement('button');
    wishlistBtn.textContent = isInWishlist ? '❤️ In Wishlist' : '🤍 Wishlist';
    wishlistBtn.className = `wishlist-btn ${isInWishlist ? 'active' : ''}`;
    wishlistBtn.setAttribute('data-id', product.id);
    
    detailsDiv.appendChild(nameEl);
    detailsDiv.appendChild(priceEl);
    detailsDiv.appendChild(ratingEl);
    detailsDiv.appendChild(viewBtn);
    detailsDiv.appendChild(addToCartBtn);
    detailsDiv.appendChild(wishlistBtn);
    
    article.appendChild(img);
    article.appendChild(detailsDiv);
    
    return article;
}

/**
 * Clear all filters and show all products
 */
function clearFilters() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    checkboxes.forEach(cb => cb.checked = false);
    applyFilters();
}

// ============================================================================
// TASK 3: EVENT HANDLING & THE CART (cart.html)
// ============================================================================

/**
 * Renders the cart page dynamically
 * Uses reduce() to calculate total and forEach() to render items
 */
function renderCartPage() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is currently empty</p>
                <a href="products.html">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    // Use reduce to calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Build cart HTML
    let cartHtml = '<ul class="cart-items">';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartHtml += `
            <li class="cart-item" data-cart-index="${index}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">₱${item.price}</p>
                </div>
                <div class="quantity-control">
                    <input type="number" value="${item.quantity}" min="1" max="10" data-index="${index}" class="cart-quantity">
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </li>
        `;
    });
    
    cartHtml += '</ul>';
    cartHtml += `
        <div class="cart-summary">
            <div class="subtotal">
                <span>Subtotal:</span>
                <span>₱${subtotal.toFixed(2)}</span>
            </div>
            <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
            <a href="products.html" class="continue-shopping">← Continue Shopping</a>
        </div>
    `;
    
    cartContainer.innerHTML = cartHtml;
    
    // Add event listeners to quantity inputs
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const newQuantity = parseInt(e.target.value);
            updateCartQuantity(index, newQuantity);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        });
    });
}

/**
 * Update quantity of an item in cart
 * If quantity becomes 0, remove the item using filter
 * @param {number} index - Index of item in cart array
 * @param {number} newQuantity - New quantity value
 */
function updateCartQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        // Remove item using filter
        cart = cart.filter((_, i) => i !== index);
    } else {
        cart[index].quantity = newQuantity;
    }
    saveCart();
    renderCartPage();
    updateCartBadge();
}

/**
 * Remove item from cart by index
 * @param {number} index - Index of item to remove
 */
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartPage();
    updateCartBadge();
    showNotification('Item removed from cart', 'info');
}

/**
 * Add product to cart
 * @param {number} productId - ID of product to add
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    saveCart();
    updateCartBadge();
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Add fade-in animation to the product card
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (productCard) {
        addFadeInAnimation(productCard);
    }
}

/**
 * Update cart badge count in header
 */
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// ============================================================================
// TASK 4: FORM VALIDATION & SUBMISSION (checkout.html)
// ============================================================================

/**
 * Setup checkout form validation
 * Uses preventDefault() to stop page reload
 */
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        
        // Get form fields
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');
        const city = document.getElementById('city');
        const zipcode = document.getElementById('zipcode');
        
        let isValid = true;
        
        // Validation function
        function validateField(field, errorMessage) {
            if (!field.value.trim()) {
                field.classList.add('error');
                showFieldError(field, errorMessage);
                isValid = false;
            } else {
                field.classList.remove('error');
                hideFieldError(field);
            }
        }
        
        // Email validation
        function validateEmail(emailField) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
                emailField.classList.add('error');
                showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            } else {
                emailField.classList.remove('error');
                hideFieldError(emailField);
            }
        }
        
        // Phone validation
        function validatePhone(phoneField) {
            const phoneRegex = /^[\d\s\-+()]{10,}$/;
            if (!phoneField.value.trim() || !phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
                phoneField.classList.add('error');
                showFieldError(phoneField, 'Please enter a valid phone number');
                isValid = false;
            } else {
                phoneField.classList.remove('error');
                hideFieldError(phoneField);
            }
        }
        
        // Run validations
        validateField(fullname, 'Full name is required');
        validateEmail(email);
        validatePhone(phone);
        validateField(address, 'Street address is required');
        validateField(city, 'City is required');
        validateField(zipcode, 'ZIP code is required');
        
        if (isValid) {
            // Process order
            processOrder();
        } else {
            showNotification('Please fix the errors in the form', 'error');
        }
    });
}

/**
 * Display error message for a field
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
    let errorDiv = field.parentElement.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        field.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.color = '#c62828';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '4px';
}

/**
 * Hide error message for a field
 * @param {HTMLElement} field - Form field element
 */
function hideFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Process the order after validation
 */
function processOrder() {
    if (!currentUser) {
        showNotification('Please sign in to place an order', 'error');
        setTimeout(() => {
            window.location.href = 'signin.html';
        }, 1500);
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Get form values
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'Credit Card';
    
    // Get delivery method
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked')?.value || 'Standard Delivery';
    const deliveryFee = deliveryMethod === 'Express Delivery' ? 50 : 20;
    
    // Calculate totals using reduce
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee;
    
    // Create order object
    const order = {
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        customer: { name: fullname, email: email, phone: phone, address: `${address}, ${city}, ${zipcode}` },
        items: cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity, image: item.image })),
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        status: 'Processing',
        userEmail: currentUser.email
    };
    
    // Save order to user's history
    if (!allOrders[currentUser.email]) {
        allOrders[currentUser.email] = [];
    }
    allOrders[currentUser.email].push(order);
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();
    
    showNotification(`Order placed successfully! Order ID: ${order.id}`, 'success');
    
    // Redirect to account page after 2 seconds
    setTimeout(() => {
        window.location.href = 'account.html';
    }, 2000);
}

// ============================================================================
// TASK 5: USER ACCOUNT & ORDER HISTORY (account.html)
// ============================================================================

/**
 * Renders the account page with user information and order history
 * Uses details/summary elements with event listeners
 */
function renderAccountPage() {
    const accountContainer = document.getElementById('accountContainer');
    if (!accountContainer) return;
    
    if (!currentUser) {
        accountContainer.innerHTML = `
            <div class="empty-state" style="background: white; border-radius: 20px; padding: 4rem;">
                <h2 style="color: var(--brown); margin-bottom: 1rem;">No Account Found</h2>
                <p style="margin-bottom: 2rem; color: #666;">Please sign in or create an account to view your profile.</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <a href="signin.html" style="background-color: #FBBA00; color: #5A3D2B; text-decoration: none; padding: 1rem 2rem; border-radius: 5px; font-weight: bold;">Sign In</a>
                    <a href="signup.html" style="background-color: #E5781E; color: white; text-decoration: none; padding: 1rem 2rem; border-radius: 5px; font-weight: bold;">Sign Up</a>
                </div>
            </div>
        `;
        return;
    }
    
    // Get user's orders
    const userOrders = allOrders[currentUser.email] || [];
    
    accountContainer.innerHTML = `
        <div class="welcome-header">
            <h1>Welcome back, <span>${currentUser.name || currentUser.email}</span>!</h1>
            <button class="logout-btn" id="logoutBtn">Logout</button>
        </div>
        
        <nav class="account-nav">
            <ul>
                <li><a href="#" class="active" data-section="profile">Profile Settings</a></li>
                <li><a href="#" data-section="orders">Order History</a></li>
                <li><a href="#" data-section="wishlist">Wishlist</a></li>
            </ul>
        </nav>
        
        <div id="profileSection" class="profile-section">
            <h2>Profile Information</h2>
            <form class="profile-form" id="profileForm">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" value="${currentUser.name || ''}" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" value="${currentUser.email}" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" value="${currentUser.phone || ''}" placeholder="Enter your phone number">
                </div>
                <div class="form-group">
                    <label for="address">Default Address</label>
                    <input type="text" id="address" value="${currentUser.address || ''}" placeholder="Enter your address">
                </div>
                <button type="submit" class="save-btn">Save Changes</button>
            </form>
        </div>
        
        <div id="ordersSection" class="order-history" style="display: none;">
            <h2>Order History</h2>
            <div id="ordersList"></div>
        </div>
        
        <div id="wishlistSection" class="profile-section" style="display: none;">
            <h2>My Wishlist</h2>
            <div id="wishlistItems" class="product-grid"></div>
        </div>
    `;
    
    // Setup profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', updateProfile);
    }
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Setup navigation tabs
    document.querySelectorAll('.account-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showAccountSection(section);
        });
    });
    
    // Load orders and wishlist
    renderOrderHistory();
    renderWishlistPage();
}

/**
 * Show specific section in account page
 * @param {string} section - Section to show ('profile', 'orders', or 'wishlist')
 */
function showAccountSection(section) {
    // Update active nav link
    document.querySelectorAll('.account-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
    
    // Show selected section
    document.getElementById('profileSection').style.display = section === 'profile' ? 'block' : 'none';
    document.getElementById('ordersSection').style.display = section === 'orders' ? 'block' : 'none';
    document.getElementById('wishlistSection').style.display = section === 'wishlist' ? 'block' : 'none';
    
    // Refresh data if needed
    if (section === 'orders') {
        renderOrderHistory();
    } else if (section === 'wishlist') {
        renderWishlistPage();
    }
}

/**
 * Render order history using details/summary elements
 * Event listeners are attached to summary elements for dynamic injection
 */
function renderOrderHistory() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;
    
    const userOrders = allOrders[currentUser?.email] || [];
    
    if (userOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <p>You haven't placed any orders yet.</p>
                <a href="products.html" style="display: inline-block; margin-top: 1rem; color: #E5781E;">Start Shopping →</a>
            </div>
        `;
        return;
    }
    
    // Sort orders by date (newest first)
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    ordersList.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <details>
                <summary class="order-header">
                    <h3>
                        <span>📦 Order #${order.id}</span>
                        <span class="order-status">${order.status || 'Processing'}</span>
                    </h3>
                    <div>
                        <span>${new Date(order.date).toLocaleDateString()}</span>
                        <span style="margin-left: 1rem;">Total: ₱${order.total.toFixed(2)}</span>
                    </div>
                </summary>
                <div class="order-details" data-order-id="${order.id}">
                    <!-- Order details will be injected dynamically -->
                </div>
            </details>
        </div>
    `).join('');
    
    // Add event listeners to summary elements for dynamic content injection
    document.querySelectorAll('.order-card details').forEach((details, index) => {
        const summary = details.querySelector('summary');
        const orderData = userOrders[index];
        const detailsDiv = details.querySelector('.order-details');
        
        // Pre-populate details div with order information
        if (detailsDiv && orderData) {
            detailsDiv.innerHTML = `
                <div class="order-info-grid">
                    <div class="info-item">
                        <span class="label">Order Date</span>
                        <span class="value">${new Date(orderData.date).toLocaleString()}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Payment Method</span>
                        <span class="value">${orderData.paymentMethod || 'Credit Card'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Delivery Method</span>
                        <span class="value">${orderData.deliveryMethod || 'Standard Delivery'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Shipping Address</span>
                        <span class="value">${orderData.customer?.address || 'Address not provided'}</span>
                    </div>
                </div>
                <div class="table-container">
                    <table class="order-items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderData.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity || 1}</td>
                                    <td>₱${item.price.toFixed(2)}</td>
                                    <td>₱${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="order-total-row">
                    Subtotal: ₱${orderData.subtotal.toFixed(2)} |
                    Delivery Fee: ₱${orderData.deliveryFee}.00 |
                    <span>Total: ₱${orderData.total.toFixed(2)}</span>
                </div>
            `;
        }
        
        // Add event listener to summary for animation on expand
        if (summary) {
            summary.addEventListener('click', () => {
                setTimeout(() => {
                    const content = details.querySelector('.order-details');
                    if (content && details.open) {
                        content.style.animation = 'fadeIn 0.3s ease';
                    }
                }, 10);
            });
        }
    });
}

/**
 * Render wishlist items on account page
 */
function renderWishlistPage() {
    const container = document.getElementById('wishlistItems');
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <p>Your wishlist is empty. Save items you love!</p>
                <a href="products.html" style="display: inline-block; margin-top: 1rem; color: #E5781E;">Browse Products →</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    wishlist.forEach(item => {
        const article = document.createElement('article');
        article.className = 'product-card';
        article.setAttribute('data-product-id', item.id);
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'product-details';
        
        const nameEl = document.createElement('h3');
        nameEl.textContent = item.name;
        
        const priceEl = document.createElement('p');
        priceEl.className = 'price';
        priceEl.textContent = `₱${item.price}`;
        
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.setAttribute('data-id', item.id);
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-wishlist-btn';
        removeBtn.setAttribute('data-id', item.id);
        removeBtn.style.backgroundColor = '#ff4444';
        removeBtn.style.color = 'white';
        removeBtn.style.marginTop = '8px';
        
        detailsDiv.appendChild(nameEl);
        detailsDiv.appendChild(priceEl);
        detailsDiv.appendChild(addToCartBtn);
        detailsDiv.appendChild(removeBtn);
        
        article.appendChild(img);
        article.appendChild(detailsDiv);
        
        container.appendChild(article);
    });
    
    // Add event listeners for wishlist buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            addToCart(id);
        });
    });
    
    container.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            removeFromWishlist(id);
            renderWishlistPage();
        });
    });
}

/**
 * Update user profile
 * @param {Event} event - Form submit event
 */
function updateProfile(event) {
    event.preventDefault();
    
    currentUser.name = document.getElementById('name').value;
    currentUser.email = document.getElementById('email').value;
    currentUser.phone = document.getElementById('phone').value;
    currentUser.address = document.getElementById('address').value;
    
    // Update in users array
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }
    
    saveUserData();
    showNotification('Profile updated successfully!', 'success');
    renderAccountPage();
}

/**
 * Logout user
 */
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'info');
    window.location.href = 'landing.html';
}

/**
 * Toggle product in wishlist
 * @param {number} productId - ID of product to toggle
 */
function toggleWishlist(productId) {
    if (!currentUser) {
        showNotification('Please sign in to add items to wishlist', 'error');
        setTimeout(() => window.location.href = 'signin.html', 1500);
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex === -1) {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            addedAt: new Date().toISOString()
        });
        showNotification(`${product.name} added to wishlist!`, 'success');
    } else {
        wishlist.splice(existingIndex, 1);
        showNotification(`${product.name} removed from wishlist`, 'info');
    }
    
    saveWishlist();
    
    // Update wishlist button on the page
    const wishlistBtn = document.querySelector(`.wishlist-btn[data-id="${productId}"]`);
    if (wishlistBtn) {
        const isInWishlist = wishlist.some(item => item.id === productId);
        wishlistBtn.textContent = isInWishlist ? '❤️ In Wishlist' : '🤍 Wishlist';
        if (isInWishlist) {
            wishlistBtn.classList.add('active');
        } else {
            wishlistBtn.classList.remove('active');
        }
    }
}

/**
 * Remove item from wishlist
 * @param {number} productId - ID of product to remove
 */
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    showNotification('Item removed from wishlist', 'info');
}

// ============================================================================
// TASK 6: EVENT DELEGATION & GLOBAL EVENT HANDLING
// ============================================================================

/**
 * Setup global event delegation for dynamic elements
 * Uses event bubbling to handle clicks on dynamically created elements
 */
function setupEventDelegation() {
    // Event delegation on document body for add to cart buttons
    document.body.addEventListener('click', (event) => {
        // Handle Add to Cart button clicks using event delegation
        const addToCartBtn = event.target.closest('.add-to-cart-btn');
        if (addToCartBtn) {
            event.preventDefault();
            const productId = parseInt(addToCartBtn.getAttribute('data-id'));
            addToCart(productId);
            return;
        }
        
        // Handle Wishlist button clicks
        const wishlistBtn = event.target.closest('.wishlist-btn');
        if (wishlistBtn) {
            event.preventDefault();
            const productId = parseInt(wishlistBtn.getAttribute('data-id'));
            toggleWishlist(productId);
            return;
        }
        
        // Handle View Details button clicks
        const viewBtn = event.target.closest('.view-details');
        if (viewBtn) {
            event.preventDefault();
            const productId = parseInt(viewBtn.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                localStorage.setItem('currentProduct', JSON.stringify(product));
                window.location.href = 'detail.html';
            }
            return;
        }
    });
}

/**
 * Setup payment method toggle on checkout page
 */
function setupPaymentToggle() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    if (paymentRadios.length) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const method = e.target.value.toLowerCase().replace(/\s/g, '');
                document.querySelectorAll('.payment-details').forEach(el => {
                    el.classList.remove('active');
                });
                const detailsMap = {
                    'creditcard': 'creditDetails',
                    'paypal': 'paypalDetails',
                    'gcash': 'gcashDetails',
                    'cashondelivery': 'codDetails'
                };
                const detailsId = detailsMap[method] || 'creditDetails';
                const detailsEl = document.getElementById(detailsId);
                if (detailsEl) detailsEl.classList.add('active');
            });
        });
    }
}

/**
 * Setup delivery method change listener
 */
function setupDeliveryChange() {
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    if (deliveryRadios.length) {
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', updateOrderSummary);
        });
    }
}

/**
 * Update order summary on checkout page
 */
function updateOrderSummary() {
    const summaryContainer = document.getElementById('orderItems');
    if (!summaryContainer) return;
    
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked')?.value || 'Standard Delivery';
    const deliveryFee = deliveryMethod === 'Express Delivery' ? 50 : 20;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee;
    
    let summaryHtml = '';
    cart.forEach(item => {
        summaryHtml += `
            <div class="summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>₱${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    summaryHtml += `
        <div class="summary-item">
            <span>Subtotal</span>
            <span>₱${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-item">
            <span>Delivery Fee</span>
            <span>₱${deliveryFee}.00</span>
        </div>
    `;
    
    summaryContainer.innerHTML = summaryHtml;
    
    const totalSpan = document.querySelector('#orderTotal span:last-child');
    if (totalSpan) {
        totalSpan.textContent = total.toFixed(2);
    }
}

/**
 * Load product details on detail page
 */
function loadProductDetails() {
    const productContainer = document.getElementById('productContainer');
    if (!productContainer) return;
    
    const savedProduct = localStorage.getItem('currentProduct');
    let product;
    
    if (savedProduct) {
        product = JSON.parse(savedProduct);
    } else {
        product = products[0];
    }
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    productContainer.innerHTML = `
        <div class="product-main">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p class="price">₱${product.price}</p>
                <p class="description">${product.description || 'Experience the perfect blend of premium coffee beans, roasted to bring out the best flavors.'}</p>
                <div class="add-to-cart-form">
                    <div class="quantity-selector">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" min="1" max="10" value="1">
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-id="${product.id}" style="margin-top: 10px;">
                        ${isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
        <section class="specs-section">
            <h2>Product Specifications</h2>
            <div class="table-container">
                <table>
                    <tr><td>Roast Level</td><td>Medium Roast</td></tr>
                    <tr><td>Bean Type</td><td>100% Arabica</td></tr>
                    <tr><td>Origin</td><td>Colombia, Ethiopia</td></tr>
                    <tr><td>Flavor Notes</td><td>Chocolate, Nuts, Caramel</td></tr>
                    <tr><td>Caffeine Content</td><td>Medium</td></tr>
                    <tr><td>Weight</td><td>250g</td></tr>
                </table>
            </div>
        </section>
    `;
}

// ============================================================================
// TASK 6: CSS ANIMATION CLASS TOGGLING
// ============================================================================

/**
 * Add CSS animation classes to style.css dynamically
 * These animations are triggered by JavaScript class toggling
 */
function injectAnimationStyles() {
    if (document.getElementById('dynamic-animation-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-animation-styles';
    styleSheet.textContent = `
        /* Fade In Animation - for product cards when added to cart */
        .fade-in-animation {
            animation: fadeInHighlight 0.6s ease forwards;
        }
        
        @keyframes fadeInHighlight {
            0% {
                opacity: 0.5;
                transform: scale(0.95);
                background-color: #FBBA00;
            }
            50% {
                opacity: 0.8;
                transform: scale(1.02);
                background-color: #FED9FE;
            }
            100% {
                opacity: 1;
                transform: scale(1);
                background-color: transparent;
            }
        }
        
        /* Form field error styling */
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #c62828;
            background-color: #fff5f5;
        }
        
        /* Slide in animations for notifications */
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        /* Cart badge styling */
        #cartBadge {
            background-color: #E5781E;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
            margin-left: 5px;
            display: none;
        }
        
        /* Notification styling */
        .notification {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            font-weight: 500;
        }
        
        .notification-success {
            background-color: #2e7d32;
        }
        
        .notification-error {
            background-color: #c62828;
        }
        
        .notification-info {
            background-color: #E5781E;
        }
    `;
    document.head.appendChild(styleSheet);
}

// ============================================================================
// PAGE INITIALIZATION - Run based on current page
// ============================================================================

/**
 * Initialize the appropriate functionality based on the current page
 */
function init() {
    // Load all data from localStorage
    loadData();
    
    // Inject dynamic animation styles
    injectAnimationStyles();
    
    // Setup global event delegation
    setupEventDelegation();
    
    // Update cart badge on all pages
    updateCartBadge();
    
    // Determine which page we're on and initialize accordingly
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    switch (page) {
        case 'products.html':
            renderProducts();
            setupProductFilters();
            break;
            
        case 'cart.html':
            renderCartPage();
            break;
            
        case 'checkout.html':
            setupCheckoutForm();
            setupPaymentToggle();
            setupDeliveryChange();
            updateOrderSummary();
            // Auto-fill user data if available
            if (currentUser) {
                const fullnameField = document.getElementById('fullname');
                const emailField = document.getElementById('email');
                const phoneField = document.getElementById('phone');
                const addressField = document.getElementById('address');
                if (fullnameField && currentUser.name) fullnameField.value = currentUser.name;
                if (emailField && currentUser.email) emailField.value = currentUser.email;
                if (phoneField && currentUser.phone) phoneField.value = currentUser.phone;
                if (addressField && currentUser.address) addressField.value = currentUser.address;
            }
            break;
            
        case 'account.html':
            renderAccountPage();
            break;
            
        case 'detail.html':
            loadProductDetails();
            break;
            
        case 'landing.html':
            // Update wishlist buttons on landing page
            updateWishlistButtonsOnPage();
            break;
            
        case 'signin.html':
        case 'signup.html':
            // Auth pages - no additional initialization needed
            break;
            
        default:
            // For any other page, just update wishlist buttons if they exist
            updateWishlistButtonsOnPage();
    }
}

/**
 * Update wishlist button states on the current page
 */
function updateWishlistButtonsOnPage() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        const id = parseInt(btn.getAttribute('data-id'));
        const isInWishlist = wishlist.some(item => item.id === id);
        if (isInWishlist) {
            btn.textContent = '❤️ In Wishlist';
            btn.classList.add('active');
        } else {
            btn.textContent = '🤍 Wishlist';
            btn.classList.remove('active');
        }
    });
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);