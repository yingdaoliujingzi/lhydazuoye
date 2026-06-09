// 结算页面功能

// 获取结算商品
function getCheckoutItems() {
    return JSON.parse(localStorage.getItem('checkoutItems')) || [];
}

// 获取地址列表
function getAddresses() {
    return JSON.parse(localStorage.getItem('addresses')) || [
        { id: 1, name: '张三', phone: '138****8888', province: '北京市', detail: '朝阳区xxx街道xxx小区1号楼101室', isDefault: true },
        { id: 2, name: '李四', phone: '139****9999', province: '上海市', detail: '浦东新区xxx路xxx号' }
    ];
}

// 保存地址列表
function saveAddresses(addresses) {
    localStorage.setItem('addresses', JSON.stringify(addresses));
}

// 更新购物车数量显示
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// 渲染收货地址
function renderAddresses() {
    const addresses = getAddresses();
    const container = document.getElementById('address-list');
    
    if (addresses.length === 0) {
        container.innerHTML = '<p style="color:#999;">暂无收货地址，请添加</p>';
        return;
    }
    
    container.innerHTML = '';
    
    addresses.forEach(address => {
        const addressItem = document.createElement('div');
        addressItem.className = `address-item ${address.isDefault ? 'selected' : ''}`;
        addressItem.dataset.id = address.id;
        addressItem.onclick = function() {
            selectAddress(address.id);
        };
        addressItem.innerHTML = `
            <div class="address-name">${address.name}</div>
            <div class="address-phone">${address.phone}</div>
            <div class="address-detail">${address.province} ${address.detail}</div>
        `;
        container.appendChild(addressItem);
    });
}

// 选择地址
function selectAddress(addressId) {
    const addresses = getAddresses();
    addresses.forEach(addr => {
        addr.isDefault = addr.id === addressId;
    });
    saveAddresses(addresses);
    renderAddresses();
}

// 渲染商品清单
function renderProducts() {
    const items = getCheckoutItems();
    const container = document.getElementById('product-list');
    
    container.innerHTML = '';
    
    items.forEach(item => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div class="product-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-item-info">
                <div class="product-item-name">${item.name}</div>
                <div class="product-item-price">¥${item.price}</div>
                <div class="product-item-quantity">数量：${item.quantity}</div>
            </div>
        `;
        container.appendChild(productItem);
    });
    
    // 更新订单摘要
    updateOrderSummary();
}

// 更新订单摘要
function updateOrderSummary() {
    const items = getCheckoutItems();
    
    // 计算商品金额
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // 运费（满99免运费）
    const shipping = subtotal >= 99 ? 0 : 10;
    
    // 获取选中的优惠券
    const coupon = document.querySelector('input[name="coupon"]:checked').value;
    let discount = 0;
    if (coupon !== 'none') {
        const couponValue = parseInt(coupon);
        // 检查是否满足使用条件
        if ((couponValue === 10 && subtotal >= 100) || (couponValue === 20 && subtotal >= 200)) {
            discount = couponValue;
        }
    }
    
    // 计算总价
    const total = subtotal + shipping - discount;
    
    // 更新显示
    document.getElementById('subtotal').textContent = `¥${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? '免运费' : `¥${shipping.toFixed(2)}`;
    document.getElementById('discount').textContent = discount > 0 ? `-¥${discount.toFixed(2)}` : '¥0.00';
    document.getElementById('total').textContent = `¥${total.toFixed(2)}`;
    
    // 保存订单金额到localStorage（用于订单成功页）
    localStorage.setItem('orderTotal', total.toFixed(2));
}

// 显示地址弹窗
function showAddressModal() {
    document.getElementById('address-modal').classList.add('show');
}

// 隐藏地址弹窗
function hideAddressModal() {
    document.getElementById('address-modal').classList.remove('show');
    // 清空表单
    document.getElementById('address-form').reset();
}

// 添加地址
function addAddress(e) {
    e.preventDefault();
    
    const name = document.getElementById('address-name').value.trim();
    const phone = document.getElementById('address-phone').value.trim();
    const province = document.getElementById('address-province').value.trim();
    const detail = document.getElementById('address-detail').value.trim();
    
    if (!name || !phone || !province || !detail) {
        alert('请填写完整地址信息');
        return;
    }
    
    const addresses = getAddresses();
    const newAddress = {
        id: Date.now(),
        name: name,
        phone: phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
        province: province,
        detail: detail,
        isDefault: addresses.length === 0 // 如果是第一个地址，设为默认
    };
    
    addresses.push(newAddress);
    saveAddresses(addresses);
    
    // 更新地址列表
    renderAddresses();
    
    // 隐藏弹窗
    hideAddressModal();
}

// 提交订单
function submitOrder() {
    const addresses = getAddresses();
    const selectedAddress = addresses.find(a => a.isDefault);
    
    if (!selectedAddress) {
        alert('请选择收货地址');
        return;
    }
    
    const items = getCheckoutItems();
    if (items.length === 0) {
        alert('订单中没有商品');
        return;
    }
    
    // 创建订单
    const order = {
        id: 'LG' + Date.now(),
        items: items,
        address: selectedAddress,
        total: parseFloat(document.getElementById('total').textContent.replace('¥', '')),
        status: '待付款',
        createTime: new Date().toLocaleString()
    };
    
    // 保存订单到localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // 清空购物车中已结算的商品
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIds = items.map(item => item.id);
    cart = cart.filter(item => !itemIds.includes(item.id));
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 清空结算商品
    localStorage.removeItem('checkoutItems');
    
    // 跳转到订单成功页面
    localStorage.setItem('currentOrder', JSON.stringify(order));
    window.location.href = 'order_success.html';
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
    // 检查是否有结算商品
    const items = getCheckoutItems();
    if (items.length === 0) {
        alert('购物车中没有商品，请先添加商品');
        window.location.href = 'index.html';
        return;
    }
    
    renderAddresses();
    renderProducts();
    updateCartCount();
    initSearch();
    initLoginStatus();
    
    // 优惠券选择事件
    document.querySelectorAll('input[name="coupon"]').forEach(radio => {
        radio.addEventListener('change', updateOrderSummary);
    });
    
    // 地址表单提交
    document.getElementById('address-form').addEventListener('submit', addAddress);
});