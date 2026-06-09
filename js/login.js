// 登录页面功能

// 验证用户名
function validateUsername(username) {
    const errorElement = document.getElementById('username-error');
    
    if (!username) {
        errorElement.textContent = '请输入用户名';
        return false;
    }
    
    if (username.length < 3 || username.length > 20) {
        errorElement.textContent = '用户名长度应在3-20个字符之间';
        return false;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errorElement.textContent = '用户名只能包含字母、数字和下划线';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

// 验证密码
function validatePassword(password) {
    const errorElement = document.getElementById('password-error');
    
    if (!password) {
        errorElement.textContent = '请输入密码';
        return false;
    }
    
    if (password.length < 6) {
        errorElement.textContent = '密码长度不能少于6位';
        return false;
    }
    
    // 密码强度检查
    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    errorElement.textContent = '';
    return true;
}

// 模拟登录验证
function authenticate(username, password) {
    // 从localStorage获取用户数据
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 查找用户
    const user = users.find(u => u.username === username && u.password === password);
    
    return user;
}

// 登录处理
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // 验证表单
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    
    if (!isUsernameValid || !isPasswordValid) {
        return;
    }
    
    // 验证用户
    const user = authenticate(username, password);
    
    if (user) {
        // 保存登录状态
        localStorage.setItem('user', JSON.stringify(user));
        
        // 如果勾选记住我，保存到cookie（模拟）
        if (remember) {
            localStorage.setItem('rememberUser', username);
        } else {
            localStorage.removeItem('rememberUser');
        }
        
        // 提示登录成功
        alert('登录成功！');
        
        // 跳转到首页
        window.location.href = 'index.html';
    } else {
        document.getElementById('password-error').textContent = '用户名或密码错误';
    }
}

// 加载记住的用户名
function loadRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', handleLogin);
    
    // 加载记住的用户名
    loadRememberedUser();
    
    // 输入框实时验证
    document.getElementById('username').addEventListener('blur', function() {
        validateUsername(this.value.trim());
    });
    
    document.getElementById('password').addEventListener('blur', function() {
        validatePassword(this.value);
    });
});