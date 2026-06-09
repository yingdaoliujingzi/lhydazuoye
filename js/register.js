// 注册页面功能

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
    
    // 检查用户名是否已存在
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username)) {
        errorElement.textContent = '该用户名已被注册';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

// 验证邮箱
function validateEmail(email) {
    const errorElement = document.getElementById('email-error');
    
    if (!email) {
        errorElement.textContent = '请输入邮箱地址';
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = '请输入有效的邮箱地址';
        return false;
    }
    
    // 检查邮箱是否已被注册
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        errorElement.textContent = '该邮箱已被注册';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

// 验证手机号
function validatePhone(phone) {
    const errorElement = document.getElementById('phone-error');
    
    if (!phone) {
        errorElement.textContent = '';
        return true; // 手机号非必填
    }
    
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        errorElement.textContent = '请输入有效的手机号';
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
    
    // 密码强度提示
    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    const strengthText = ['', '弱', '中', '强', '非常强'];
    if (strength < 3) {
        errorElement.textContent = `密码强度：${strengthText[strength]}，建议使用字母、数字和特殊字符组合`;
    } else {
        errorElement.textContent = `密码强度：${strengthText[strength]}`;
    }
    
    return true;
}

// 验证确认密码
function validateConfirmPassword(password, confirmPassword) {
    const errorElement = document.getElementById('confirm-error');
    
    if (!confirmPassword) {
        errorElement.textContent = '请再次输入密码';
        return false;
    }
    
    if (password !== confirmPassword) {
        errorElement.textContent = '两次输入的密码不一致';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

// 验证同意协议
function validateAgree() {
    const agree = document.getElementById('agree').checked;
    if (!agree) {
        alert('请阅读并同意用户协议和隐私政策');
        return false;
    }
    return true;
}

// 注册处理
function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // 验证表单
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(password, confirmPassword);
    const isAgreeValid = validateAgree();
    
    if (!isUsernameValid || !isEmailValid || !isPhoneValid || !isPasswordValid || !isConfirmValid || !isAgreeValid) {
        return;
    }
    
    // 创建用户对象
    const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        phone: phone,
        password: password,
        registerTime: new Date().toISOString(),
        avatar: ''
    };
    
    // 获取现有用户列表
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 添加新用户
    users.push(newUser);
    
    // 保存到localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // 提示注册成功
    alert('注册成功！请登录');
    
    // 跳转到登录页面
    window.location.href = 'login.html';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', handleRegister);
    
    // 输入框实时验证
    document.getElementById('username').addEventListener('blur', function() {
        validateUsername(this.value.trim());
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        validateEmail(this.value.trim());
    });
    
    document.getElementById('phone').addEventListener('blur', function() {
        validatePhone(this.value.trim());
    });
    
    document.getElementById('password').addEventListener('blur', function() {
        validatePassword(this.value);
    });
    
    document.getElementById('confirm-password').addEventListener('blur', function() {
        const password = document.getElementById('password').value;
        validateConfirmPassword(password, this.value);
    });
});