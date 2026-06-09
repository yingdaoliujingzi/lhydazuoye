// 购物车页面功能

// 获取购物车数据
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// 保存购物车数据
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 更新购物车数量显示
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// 渲染购物车列表
function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');
    const cartFooter = document.getElementById('cart-footer');
    
    if (cart.length === 0) {
        container.style.display = 'none';
        cartFooter.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    container.style.display = 'block';
    cartFooter.style.display = 'flex';
    emptyCart.style.display = 'none';
    
    container.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.id = item.id;
        cartItem.innerHTML = `
            <input type="checkbox" class="item-checkbox" checked>
            <div class="cart-item-image" onclick="goToProduct(${item.id})">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name" onclick="goToProduct(${item.id})">${item.name}</div>
                <div class="cart-item-price">¥${item.price}<span>¥${item.originalPrice}</span></div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <div class="cart-item-subtotal">¥${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-item-delete">
                <button onclick="removeItem(${item.id})">删除</button>
            </div>
        `;
        container.appendChild(cartItem);
    });
    
    // 更新选中数量和总价
    updateSelectedInfo();
}

// 增加数量
function increaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        saveCart(cart);
        renderCart();
    }
}

// 减少数量
function decreaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart(cart);
        renderCart();
    }
}

// 更新数量
function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        const qty = parseInt(quantity) || 1;
        item.quantity = Math.max(1, qty);
        saveCart(cart);
        renderCart();
    }
}

// 删除商品
function removeItem(productId) {
    if (confirm('确定要删除该商品吗？')) {
        let cart = getCart();
        cart = cart.filter(i => i.id !== productId);
        saveCart(cart);
        renderCart();
    }
}

// 更新选中信息
function updateSelectedInfo() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const selectedNum = document.getElementById('selected-num');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let selectedCount = 0;
    let total = 0;
    const cart = getCart();
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedCount += cart[index].quantity;
            total += cart[index].price * cart[index].quantity;
        }
    });
    
    selectedNum.textContent = selectedCount;
    totalPrice.textContent = total.toFixed(2);
    
    // 启用/禁用结算按钮
    checkoutBtn.disabled = selectedCount === 0;
}

// 全选/取消全选
function toggleSelectAll() {
    const selectAll = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.item-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateSelectedInfo();
}

// 跳转到商品详情页
function goToProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'product.html';
}

// 跳转到结算页面
function goToCheckout() {
    // 获取选中的商品
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const cart = getCart();
    const selectedItems = [];
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedItems.push(cart[index]);
        }
    });
    
    if (selectedItems.length === 0) {
        alert('请选择要结算的商品');
        return;
    }
    
    // 保存选中的商品到localStorage
    localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
    
    // 跳转到结算页面
    window.location.href = 'checkout.html';
}

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', function() {
        const keyword = searchInput.value.trim();
        if (keyword) {
            localStorage.setItem('searchKeyword', keyword);
            window.location.href = 'index.html';
        }
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// 初始化登录状态
function initLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginLink = document.getElementById('login-link');
    
    if (user) {
        loginLink.textContent = user.username;
        loginLink.href = 'profile.html';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartCount();
    initSearch();
    initLoginStatus();
    
    // 全选事件
    document.getElementById('select-all').addEventListener('change', toggleSelectAll);
    
    // 单个商品选中事件
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('item-checkbox')) {
            updateSelectedInfo();
            
            // 更新全选状态
            const checkboxes = document.querySelectorAll('.item-checkbox');
            const selectAll = document.getElementById('select-all');
            selectAll.checked = Array.from(checkboxes).every(cb => cb.checked);
        }
    });
});
