// 首页功能实现

// 商品数据
const products = [
    { id: 1, name: '新鲜有机苹果', price: 19.9, originalPrice: 29.9, image: 'images/fresh1.png', category: 'fresh', sales: 1200 },
    { id: 2, name: '精选香蕉', price: 9.9, originalPrice: 14.9, image: 'images/fresh2.png', category: 'fresh', sales: 2300 },
    { id: 3, name: '进口橙子', price: 15.9, originalPrice: 22.9, image: 'images/fresh3.png', category: 'fresh', sales: 1500 },
    { id: 4, name: '新鲜草莓', price: 29.9, originalPrice: 39.9, image: 'images/fresh4.png', category: 'fresh', sales: 800 },
    { id: 5, name: '时尚T恤', price: 59.9, originalPrice: 99.9, image: 'images/clothes1.png', category: 'clothes', sales: 500 },
    { id: 6, name: '休闲牛仔裤', price: 129.9, originalPrice: 199.9, image: 'images/clothes2.png', category: 'clothes', sales: 380 },
    { id: 7, name: '运动跑鞋', price: 299.9, originalPrice: 499.9, image: 'images/clothes3.png', category: 'clothes', sales: 250 },
    { id: 8, name: '保暖羽绒服', price: 399.9, originalPrice: 599.9, image: 'images/clothes4.png', category: 'clothes', sales: 180 },
    { id: 9, name: '简约台灯', price: 49.9, originalPrice: 79.9, image: 'images/home1.png', category: 'home', sales: 600 },
    { id: 10, name: '舒适沙发', price: 899.9, originalPrice: 1299.9, image: 'images/home2.png', category: 'home', sales: 120 },
    { id: 11, name: '收纳盒套装', price: 39.9, originalPrice: 59.9, image: 'images/home3.png', category: 'home', sales: 850 },
    { id: 12, name: '床上四件套', price: 199.9, originalPrice: 299.9, image: 'images/home4.png', category: 'home', sales: 420 },
    { id: 13, name: '智能电饭煲', price: 299.9, originalPrice: 449.9, image: 'images/kitchen1.png', category: 'kitchen', sales: 300 },
    { id: 14, name: '微波炉', price: 399.9, originalPrice: 599.9, image: 'images/kitchen2.png', category: 'kitchen', sales: 220 },
    { id: 15, name: '榨汁机', price: 199.9, originalPrice: 299.9, image: 'images/kitchen3.png', category: 'kitchen', sales: 450 },
    { id: 16, name: '电热水壶', price: 89.9, originalPrice: 129.9, image: 'images/kitchen4.png', category: 'kitchen', sales: 780 },
    { id: 17, name: '夏季凉席', price: 69.9, originalPrice: 99.9, image: 'images/hot1.png', category: 'hot', sales: 1500 },
    { id: 18, name: '防晒霜', price: 49.9, originalPrice: 79.9, image: 'images/hot2.png', category: 'hot', sales: 2100 },
    { id: 19, name: '遮阳帽', price: 29.9, originalPrice: 49.9, image: 'images/hot3.png', category: 'hot', sales: 1800 },
    { id: 20, name: '便携风扇', price: 39.9, originalPrice: 59.9, image: 'images/hot4.png', category: 'hot', sales: 2500 }
];

// 轮播图功能
function initBanner() {
    const bannerList = document.getElementById('banner-list');
    const bannerDots = document.getElementById('banner-dots');
    const prevBtn = document.getElementById('banner-prev');
    const nextBtn = document.getElementById('banner-next');
    const items = bannerList.querySelectorAll('.banner-item');
    const dots = bannerDots.querySelectorAll('.dot');
    let currentIndex = 0;
    let timer = null;

    // 切换轮播图
    function goToSlide(index) {
        currentIndex = index;
        bannerList.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(currentIndex);
    }

    // 自动播放
    function startAutoPlay() {
        timer = setInterval(nextSlide, 3000);
    }

    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(timer);
    }

    // 事件绑定
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // 鼠标悬停暂停
    const bannerWrapper = document.getElementById('banner-wrapper');
    bannerWrapper.addEventListener('mouseenter', stopAutoPlay);
    bannerWrapper.addEventListener('mouseleave', startAutoPlay);

    // 启动自动播放
    startAutoPlay();
}

// 渲染商品列表
function renderProducts(filteredProducts, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="goToProduct(${product.id})">
            <div class="product-info">
                <div class="product-name" onclick="goToProduct(${product.id})">${product.name}</div>
                <div class="product-price">¥${product.price}<span>¥${product.originalPrice}</span></div>
                <button class="product-add" onclick="addToCart(${product.id})">加入购物车</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 分类筛选功能 - 修复版
function initCategoryFilter() {
    // 使用 setTimeout 确保 DOM 完全加载
    setTimeout(() => {
        const categoryItems = document.querySelectorAll('.category-item');
        const sidebarLinks = document.querySelectorAll('.sidebar-categories a');
        
        console.log('分类导航元素数量:', categoryItems.length);
        console.log('侧边栏链接数量:', sidebarLinks.length);
        
        if (categoryItems.length === 0) {
            console.error('未找到.category-item 元素');
            return;
        }

        // 顶部分类导航
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                console.log('点击了分类:', this.dataset.category);
                
                // 移除所有active类
                categoryItems.forEach(i => i.classList.remove('active'));
                // 添加当前active类
                this.classList.add('active');
                
                const category = this.dataset.category;
                filterProducts(category);
            });
        });

        // 侧边栏分类
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.dataset.category;
                console.log('点击了侧边栏分类:', category);
                
                // 更新顶部导航状态
                categoryItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.category === category);
                });
                
                filterProducts(category);
            });
        });
    }, 100);
}

// 筛选商品
function filterProducts(category) {
    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    renderProducts(filteredProducts, 'product-grid');
}

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        if (!keyword) {
            filterProducts('all');
            return;
        }

        const filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(keyword)
        );
        renderProducts(filteredProducts, 'product-grid');
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 添加到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // 从localStorage获取购物车
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 检查是否已存在
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // 保存到localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 更新购物车数量显示
    updateCartCount();
    
    // 提示
    alert('已添加到购物车');
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

// 跳转到商品详情页
function goToProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'product.html';
}

// 初始化推荐商品
function initRecommend() {
    // 获取热门商品（销量最高的8个）
    const hotProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 8);
    renderProducts(hotProducts, 'recommend-grid');
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
    initBanner();
    initCategoryFilter();
    initSearch();
    initRecommend();
    initLoginStatus();
    updateCartCount();
    
    // 初始显示全部商品
    renderProducts(products, 'product-grid');
});