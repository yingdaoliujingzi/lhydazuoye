// 商品详情页功能

// 商品数据
const products = [
    { id: 1, name: '新鲜有机苹果', price: 19.9, originalPrice: 29.9, image: 'images/fresh1.png', category: 'fresh', sales: 1200, stock: 1000, specs: '规格：500g/袋，产地：山东烟台，保质期：7天', description: '精选优质有机苹果，口感清脆，酸甜可口，富含维生素C，是您健康生活的好选择。' },
    { id: 2, name: '精选香蕉', price: 9.9, originalPrice: 14.9, image: 'images/fresh2.png', category: 'fresh', sales: 2300, stock: 2000, specs: '规格：约1kg/份，产地：海南，保质期：5天', description: '新鲜采摘的香蕉，果肉饱满，香甜软糯，是早餐和下午茶的完美搭配。' },
    { id: 3, name: '进口橙子', price: 15.9, originalPrice: 22.9, image: 'images/fresh3.png', category: 'fresh', sales: 1500, stock: 800, specs: '规格：4个装，产地：澳大利亚，保质期：10天', description: '澳大利亚进口脐橙，皮薄汁多，酸甜适中，富含维生素C。' },
    { id: 4, name: '新鲜草莓', price: 29.9, originalPrice: 39.9, image: 'images/fresh4.png', category: 'fresh', sales: 800, stock: 500, specs: '规格：300g/盒，产地：云南，保质期：3天', description: '新鲜草莓，色泽鲜艳，果肉细腻，香甜多汁。' },
    { id: 5, name: '时尚T恤', price: 59.9, originalPrice: 99.9, image: 'images/clothes1.png', category: 'clothes', sales: 500, stock: 300, specs: '材质：纯棉，颜色：白/黑/灰，尺码：S/M/L/XL', description: '时尚简约T恤，纯棉面料，舒适透气，百搭款式。' },
    { id: 6, name: '休闲牛仔裤', price: 129.9, originalPrice: 199.9, image: 'images/clothes2.png', category: 'clothes', sales: 380, stock: 200, specs: '材质：牛仔布，颜色：蓝/黑，尺码：28-34', description: '经典直筒牛仔裤，修身版型，舒适耐穿。' },
    { id: 7, name: '运动跑鞋', price: 299.9, originalPrice: 499.9, image: 'images/clothes3.png', category: 'clothes', sales: 250, stock: 150, specs: '材质：网布+橡胶底，颜色：白/黑/红，尺码：39-44', description: '专业运动跑鞋，轻便透气，缓震舒适，适合各种运动场景。' },
    { id: 8, name: '保暖羽绒服', price: 399.9, originalPrice: 599.9, image: 'images/clothes4.png', category: 'clothes', sales: 180, stock: 100, specs: '材质：羽绒填充，颜色：黑/白/灰，尺码：M/L/XL', description: '轻薄保暖羽绒服，90%白鸭绒填充，保暖性极佳。' },
    { id: 9, name: '简约台灯', price: 49.9, originalPrice: 79.9, image: 'images/home1.png', category: 'home', sales: 600, stock: 400, specs: '材质：ABS+金属，颜色：白/黑，功率：12W', description: '简约北欧风格台灯，三档调光，护眼设计，适合书房卧室使用。' },
    { id: 10, name: '舒适沙发', price: 899.9, originalPrice: 1299.9, image: 'images/home2.png', category: 'home', sales: 120, stock: 50, specs: '材质：科技布+实木框架，颜色：灰/蓝/米白，尺寸：三人位', description: '现代简约沙发，科技布面料，柔软舒适，易清洁。' },
    { id: 11, name: '收纳盒套装', price: 39.9, originalPrice: 59.9, image: 'images/home3.png', category: 'home', sales: 850, stock: 600, specs: '材质：PP塑料，颜色：透明/白/粉，规格：大中小三件套', description: '多功能收纳盒套装，透明可视，便于分类整理。' },
    { id: 12, name: '床上四件套', price: 199.9, originalPrice: 299.9, image: 'images/home4.png', category: 'home', sales: 420, stock: 250, specs: '材质：纯棉，颜色：多色可选，尺寸：1.5m/1.8m床', description: '纯棉床上四件套，亲肤透气，花色精美。' },
    { id: 13, name: '智能电饭煲', price: 299.9, originalPrice: 449.9, image: 'images/kitchen1.png', category: 'kitchen', sales: 300, stock: 180, specs: '容量：4L，功率：700W，功能：煮饭/煲汤/蒸煮', description: '智能电饭煲，一键操作，煮饭软糯，多功能菜单。' },
    { id: 14, name: '微波炉', price: 399.9, originalPrice: 599.9, image: 'images/kitchen2.png', category: 'kitchen', sales: 220, stock: 120, specs: '容量：20L，功率：800W，功能：加热/解冻/烧烤', description: '家用微波炉，快速加热，多种烹饪模式。' },
    { id: 15, name: '榨汁机', price: 199.9, originalPrice: 299.9, image: 'images/kitchen3.png', category: 'kitchen', sales: 450, stock: 300, specs: '容量：1.5L，功率：400W，材质：食品级不锈钢', description: '多功能榨汁机，快速出汁，营养保留。' },
    { id: 16, name: '电热水壶', price: 89.9, originalPrice: 129.9, image: 'images/kitchen4.png', category: 'kitchen', sales: 780, stock: 500, specs: '容量：1.7L，功率：1800W，材质：不锈钢', description: '快速电热水壶，15分钟烧开，自动断电保护。' },
    { id: 17, name: '夏季凉席', price: 69.9, originalPrice: 99.9, image: 'images/hot1.png', category: 'hot', sales: 1500, stock: 800, specs: '材质：竹纤维，尺寸：1.5m/1.8m床', description: '夏季凉席，凉爽透气，亲肤舒适。' },
    { id: 18, name: '防晒霜', price: 49.9, originalPrice: 79.9, image: 'images/hot2.png', category: 'hot', sales: 2100, stock: 1200, specs: 'SPF50+ PA+++，容量：50ml，质地：清爽不油腻', description: '高倍防晒霜，清爽不油腻，有效抵御紫外线。' },
    { id: 19, name: '遮阳帽', price: 29.9, originalPrice: 49.9, image: 'images/hot3.png', category: 'hot', sales: 1800, stock: 1000, specs: '材质：棉质，颜色：多色可选，可调节大小', description: '时尚遮阳帽，防晒透气，可折叠便携。' },
    { id: 20, name: '便携风扇', price: 39.9, originalPrice: 59.9, image: 'images/hot4.png', category: 'hot', sales: 2500, stock: 1500, specs: '材质：ABS，功率：5W，续航：4-8小时', description: '便携小风扇，USB充电，三档风速，静音设计。' }
];

// 获取分类名称
function getCategoryName(category) {
    const categoryMap = {
        'fresh': '生鲜食品',
        'clothes': '服装鞋帽',
        'home': '家居用品',
        'kitchen': '厨房电器',
        'hot': '热门推荐'
    };
    return categoryMap[category] || '全部商品';
}

// 渲染商品详情
function renderProductDetail(product) {
    const container = document.getElementById('product-content');
    const categoryName = getCategoryName(product.category);
    
    // 更新面包屑
    document.getElementById('category-name').textContent = categoryName;
    
    container.innerHTML = `
        <div class="product-images">
            <div class="main-image">
                <img src="${product.image}" alt="${product.name}" id="main-img">
            </div>
            <div class="thumbnails">
                <div class="thumbnail active" onclick="changeMainImage('${product.image}')">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="thumbnail" onclick="changeMainImage('${product.image}')">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="thumbnail" onclick="changeMainImage('${product.image}')">
                    <img src="${product.image}" alt="${product.name}">
                </div>
            </div>
        </div>
        
        <div class="product-info">
            <h1 class="product-title">${product.name}</h1>
            
            <div class="product-price-section">
                <div class="price-label">商品价格</div>
                <div class="product-price">
                    ¥${product.price}
                    <span>¥${product.originalPrice}</span>
                    <span class="product-discount">省¥${(product.originalPrice - product.price).toFixed(1)}</span>
                </div>
            </div>
            
            <div class="product-specs">
                <div class="spec-item">
                    <span class="spec-label">商品规格</span>
                    <span class="spec-value">${product.specs}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">库存数量</span>
                    <span class="spec-value">${product.stock}件</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">销量</span>
                    <span class="spec-value">${product.sales}件</span>
                </div>
            </div>
            
            <div class="product-description">
                <p>${product.description}</p>
            </div>
            
            <div class="quantity-section">
                <span class="quantity-label">购买数量</span>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="decreaseQuantity()">-</button>
                    <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn" onclick="increaseQuantity(${product.stock})">+</button>
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="addToCart(${product.id})">加入购物车</button>
                <button class="btn btn-secondary" onclick="buyNow(${product.id})">立即购买</button>
            </div>
        </div>
    `;
}

// 切换主图
function changeMainImage(src) {
    document.getElementById('main-img').src = src;
    
    // 更新缩略图选中状态
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// 减少数量
function decreaseQuantity() {
    const input = document.getElementById('quantity');
    const value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
}

// 增加数量
function increaseQuantity(max) {
    const input = document.getElementById('quantity');
    const value = parseInt(input.value);
    if (value < max) {
        input.value = value + 1;
    }
}

// 添加到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    // 从localStorage获取购物车
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 检查是否已存在
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }
    
    // 保存到localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 更新购物车数量显示
    updateCartCount();
    
    // 提示
    alert('已添加到购物车');
}

// 立即购买
function buyNow(productId) {
    // 先添加到购物车
    addToCart(productId);
    // 跳转到结算页面
    window.location.href = 'checkout.html';
}

// 更新购物车数量
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// 渲染相关商品
function renderRelatedProducts(currentCategory) {
    // 获取同分类下的其他商品（排除当前商品）
    const relatedProducts = products.filter(p => p.category === currentCategory && p.id !== currentProductId);
    
    const container = document.getElementById('related-grid');
    container.innerHTML = '';
    
    relatedProducts.slice(0, 4).forEach(product => {
        const card = document.createElement('div');
        card.className = 'related-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="goToProduct(${product.id})">
            <div class="related-info">
                <div class="related-name" onclick="goToProduct(${product.id})">${product.name}</div>
                <div class="related-price">¥${product.price}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 跳转到商品详情页
function goToProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'product.html';
}

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', function() {
        const keyword = searchInput.value.trim();
        if (keyword) {
            // 保存搜索关键词并跳转到首页
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

// 当前商品ID
let currentProductId = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取选中的商品ID
    currentProductId = parseInt(localStorage.getItem('selectedProduct')) || 1;
    
    // 获取商品信息
    const product = products.find(p => p.id === currentProductId);
    
    if (product) {
        renderProductDetail(product);
        renderRelatedProducts(product.category);
    } else {
        // 如果没有找到商品，显示错误信息
        document.getElementById('product-content').innerHTML = '<p style="text-align:center; padding:50px;">商品不存在</p>';
    }
    
    initSearch();
    initLoginStatus();
    updateCartCount();
});