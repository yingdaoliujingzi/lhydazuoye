// 个人中心页面功能

// 获取用户信息
function getUser() {
    return JSON.parse(localStorage.getItem('user')) || null;
}

// 获取订单列表
function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
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

// 渲染用户信息
function renderUserInfo() {
    const user = getUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('user-avatar').textContent = user.username.charAt(0).toUpperCase();
    document.getElementById('user-name').textContent = user.username;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-phone').textContent = user.phone || '未绑定';
}

// 渲染订单列表
function renderOrders() {
    const orders = getOrders();
    const container = document.getElementById('order-list');
    
    if (orders.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:50px; color:#999;">暂无订单</p>';
        return;
    }
    
    container.innerHTML = '';
    
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-header">
                <div class="order-id">订单号：${order.id}</div>
                <div class="order-status ${getStatusClass(order.status)}">${order.status}</div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-product">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="product-info">
                            <div class="product-name">${item.name}</div>
                            <div class="product-price">¥${item.price}</div>
                            <div class="product-quantity">x${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div class="order-total">合计：¥${order.total.toFixed(2)}</div>
                <div class="order-actions">
                    ${getOrderActions(order)}
                </div>
            </div>
        `;
        container.appendChild(orderItem);
    });
}

// 获取状态样式类
function getStatusClass(status) {
    const statusMap = {
        '待付款': 'status-pending',
        '待发货': 'status-processing',
        '待收货': 'status-shipping',
        '已完成': 'status-completed',
        '已取消': 'status-canceled'
    };
    return statusMap[status] || 'status-pending';
}

// 获取订单操作按钮
function getOrderActions(order) {
    switch(order.status) {
        case '待付款':
            return `
                <button class="action-btn pay" onclick="payOrder('${order.id}')">立即支付</button>
                <button class="action-btn cancel" onclick="cancelOrder('${order.id}')">取消订单</button>
            `;
        case '待发货':
            return `<button class="action-btn">联系卖家</button>`;
        case '待收货':
            return `<button class="action-btn confirm" onclick="confirmOrder('${order.id}')">确认收货</button>`;
        case '已完成':
            return `<button class="action-btn">再次购买</button>`;
        case '已取消':
            return `<button class="action-btn">删除订单</button>`;
        default:
            return '';
    }
}

// 支付订单
function payOrder(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = '待发货';
        localStorage.setItem('orders', JSON.stringify(orders));
        renderOrders();
        alert('支付成功！');
    }
}

// 取消订单
function cancelOrder(orderId) {
    if (confirm('确定要取消订单吗？')) {
        const orders = getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = '已取消';
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrders();
            alert('订单已取消');
        }
    }
}

// 确认收货
function confirmOrder(orderId) {
    if (confirm('确认已收到商品吗？')) {
        const orders = getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = '已完成';
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrders();
            alert('已确认收货');
        }
    }
}

// 渲染侧边栏菜单
function renderSidebar() {
    const menuItems = [
        { id: 'orders', label: '我的订单', icon: '📦', active: true },
        { id: 'address', label: '收货地址', icon: '📍' },
        { id: 'coupons', label: '优惠券', icon: '🎫' },
        { id: 'settings', label: '账户设置', icon: '⚙️' }
    ];
    
    const container = document.getElementById('sidebar-menu');
    container.innerHTML = menuItems.map(item => `
        <div class="sidebar-item ${item.active ? 'active' : ''}" data-id="${item.id}">
            <span class="menu-icon">${item.icon}</span>
            <span class="menu-label">${item.label}</span>
        </div>
    `).join('');
    
    // 绑定菜单点击事件
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            showContent(this.dataset.id);
        });
    });
}

// 显示对应内容
function showContent(contentId) {
    document.querySelectorAll('.content-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    document.getElementById(`${contentId}-panel`).style.display = 'block';
    
    // 如果是地址面板，重新渲染
    if (contentId === 'address') {
        renderAddresses();
    }
}

// 渲染地址列表
function renderAddresses() {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const container = document.getElementById('address-list');
    
    if (addresses.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:50px; color:#999;">暂无收货地址</p>';
        return;
    }
    
    container.innerHTML = '';
    
    addresses.forEach(address => {
        const addressItem = document.createElement('div');
        addressItem.className = 'address-item';
        addressItem.innerHTML = `
            <div class="address-info">
                <div class="address-header">
                    <span class="address-name">${address.name}</span>
                    <span class="address-phone">${address.phone}</span>
                    ${address.isDefault ? '<span class="default-tag">默认</span>' : ''}
                </div>
                <div class="address-detail">${address.province} ${address.detail}</div>
            </div>
            <div class="address-actions">
                <button onclick="setDefaultAddress(${address.id})">设为默认</button>
                <button onclick="deleteAddress(${address.id})">删除</button>
            </div>
        `;
        container.appendChild(addressItem);
    });
}

// 设置默认地址
function setDefaultAddress(addressId) {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses.forEach(addr => {
        addr.isDefault = addr.id === addressId;
    });
    localStorage.setItem('addresses', JSON.stringify(addresses));
    renderAddresses();
}

// 删除地址
function deleteAddress(addressId) {
    if (confirm('确定要删除该地址吗？')) {
        let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        addresses = addresses.filter(addr => addr.id !== addressId);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        renderAddresses();
    }
}

// 渲染优惠券
function renderCoupons() {
    const coupons = [
        { id: 1, value: 10, condition: 100, name: '满100减10', valid: true },
        { id: 2, value: 20, condition: 200, name: '满200减20', valid: true },
        { id: 3, value: 5, condition: 50, name: '满50减5', valid: false }
    ];
    
    const container = document.getElementById('coupon-list');
    container.innerHTML = coupons.map(coupon => `
        <div class="coupon-item ${coupon.valid ? '' : 'expired'}">
            <div class="coupon-left">
                <div class="coupon-value">¥${coupon.value}</div>
                <div class="coupon-condition">满${coupon.condition}可用</div>
            </div>
            <div class="coupon-right">
                <div class="coupon-name">${coupon.name}</div>
                <div class="coupon-status">${coupon.valid ? '可使用' : '已过期'}</div>
            </div>
        </div>
    `).join('');
}

// 渲染账户设置
function renderSettings() {
    const user = getUser();
    const container = document.getElementById('settings-panel');
    container.innerHTML = `
        <div class="settings-form">
            <div class="form-group">
                <label>用户名</label>
                <input type="text" id="setting-username" value="${user.username}" readonly>
            </div>
            <div class="form-group">
                <label>邮箱</label>
                <input type="email" id="setting-email" value="${user.email}">
            </div>
            <div class="form-group">
                <label>手机号</label>
                <input type="tel" id="setting-phone" value="${user.phone || ''}">
            </div>
            <div class="form-group">
                <label>修改密码</label>
                <input type="password" id="setting-password" placeholder="请输入新密码">
            </div>
            <button class="save-btn" onclick="saveSettings()">保存设置</button>
        </div>
    `;
}

// 保存账户设置
function saveSettings() {
    const user = getUser();
    user.email = document.getElementById('setting-email').value;
    user.phone = document.getElementById('setting-phone').value;
    
    const newPassword = document.getElementById('setting-password').value;
    if (newPassword) {
        if (newPassword.length < 6) {
            alert('密码长度不能少于6位');
            return;
        }
        user.password = newPassword;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    alert('设置已保存');
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    if (!getUser()) {
        window.location.href = 'login.html';
        return;
    }
    
    renderUserInfo();
    renderOrders();
    renderSidebar();
    renderCoupons();
    renderSettings();
    updateCartCount();
    initSearch();
    
    // 绑定退出登录事件
    document.getElementById('logout-btn').addEventListener('click', logout);
});