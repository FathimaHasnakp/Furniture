



document.addEventListener('DOMContentLoaded', () => {

    // ====== Data ======
    let cartItems = [];
    let wishlistItems = [];

    // ====== DOM Elements ======
    const cartItemsContainer = document.querySelector('.cart-items');
    const wishlistItemsContainer = document.querySelector('.wishlist-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cart-count');
    const wishlistCountEl = document.getElementById('wishlist-count');
    const cartPreview = document.getElementById('cart-preview');
    const wishlistPreview = document.getElementById('wishlist-preview');
    const addCartButtons = document.querySelectorAll('.add-cart');
    const addWishlistButtons = document.querySelectorAll('.add-wishlist');
    const cartBtn = document.querySelector('.cart');
    const wishlistBtn = document.querySelector('.wishlist');
    const backToTop = document.getElementById('backToTop');

    // ====== Functions ======
    function updateCartCount() {
        cartCountEl.textContent = cartItems.length;
    }

    function updateWishlistCount() {
        wishlistCountEl.textContent = wishlistItems.length;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            // Fix: remove ₹ and commas before parsing
            let priceNumber = parseFloat(item.price.replace('₹', '').replace(/,/g, '').trim());
            total += priceNumber;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <span>${item.name} - ${item.price}</span>
                <button data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(div);
        });

        // Show total with commas
        cartTotalEl.textContent = `₹${total.toLocaleString()}`;

        // Remove item
        const removeBtns = cartItemsContainer.querySelectorAll('button');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cartItems.splice(index, 1);
                updateCartCount();
                renderCart();
            });
        });
    }

    function renderWishlist() {
        wishlistItemsContainer.innerHTML = '';
        wishlistItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('wishlist-item');
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <span>${item.name} - ${item.price}</span>
                <button data-index="${index}">Remove</button>
            `;
            wishlistItemsContainer.appendChild(div);
        });

        const removeBtns = wishlistItemsContainer.querySelectorAll('button');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                wishlistItems.splice(index, 1);
                updateWishlistCount();
                renderWishlist();
            });
        });
    }

    // ====== Add to Cart ======
    addCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('p').textContent;
            const img = card.querySelector('img').src;

            if (!cartItems.find(item => item.name === name)) {
                cartItems.push({ name, price, img });
            }

            updateCartCount();
            renderCart();
            cartPreview.style.display = 'block';
        });
    });

    // ====== Add to Wishlist ======
    addWishlistButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('p').textContent;
            const img = card.querySelector('img').src;

            if (!wishlistItems.find(item => item.name === name)) {
                wishlistItems.push({ name, price, img });
            }

            updateWishlistCount();
            renderWishlist();
            wishlistPreview.style.display = 'block';
        });
    });

    // ====== Toggle Previews ======
    cartBtn.addEventListener('click', () => {
        cartPreview.style.display = cartPreview.style.display === 'block' ? 'none' : 'block';
    });

    wishlistBtn.addEventListener('click', () => {
        wishlistPreview.style.display = wishlistPreview.style.display === 'block' ? 'none' : 'block';
    });

    // ====== Back to Top ======
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});




const logoutBtn = document.getElementById('logout-btn');

function checkLogin() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        logoutBtn.style.display = 'inline-block';
    } else {
        logoutBtn.style.display = 'none';
    }
}

checkLogin(); // Run on page load

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn'); // clear login
    window.location.href = "login.html";    // go back to login page
});

