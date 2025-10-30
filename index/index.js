



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





// (function () {
//     emailjs.init("mfSRGGNvc-o7YLotD");
// })();

// document.getElementById("contact-form").addEventListener("submit", function (e) {
//     e.preventDefault();


//     var templateParams = {
//         from_name: document.getElementById("from_name").value,
//         email_id: document.getElementById("email_id").value,
//         message: document.getElementById("message").value,
//     };

//     emailjs.send("service_pg0h5mc", "template_5mmqtji", templateParams).then(
//         (response) => {
//             console.log('SUCCESS!', response.status, response.text);
//         },
//         (error) => {
//             console.log('FAILED...', error);
//         },
//     )

// });

(function () {
    emailjs.init("mfSRGGNvc-o7YLotD");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const fromName = document.getElementById("from_name").value.trim();
    const emailId = document.getElementById("email_id").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation checks
    if (fromName === "" || emailId === "" || message === "") {
        alert("⚠️ Please fill out all fields.");
        return;
    }

    if (!emailPattern.test(emailId)) {
        alert("⚠️ Please enter a valid email address.");
        return;
    }

    // Prepare parameters for EmailJS
    const templateParams = {
        from_name: fromName,
        email_id: emailId,
        message: message,
    };

    // Send email using EmailJS
    emailjs.send("service_pg0h5mc", "template_5mmqtji", templateParams)
        .then((response) => {
            console.log("SUCCESS!", response.status, response.text);
            alert("✅ Message sent successfully!");
            document.getElementById("contact-form").reset();
        })
        .catch((error) => {
            console.log("FAILED...", error);
            alert("❌ Failed to send message. Please try again later.");
        });
});



document.addEventListener('DOMContentLoaded', () => {
    // CHANGE THIS LINE to select by ID
    const menuToggle = document.getElementById('mobile-menu'); 
    
    const navLinks = document.querySelector('.nav-links');

    // ... rest of the code ...
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
