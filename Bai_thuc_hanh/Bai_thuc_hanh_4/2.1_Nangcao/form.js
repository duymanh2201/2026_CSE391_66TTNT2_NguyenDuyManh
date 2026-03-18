const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const success = document.getElementById("success");

function showError(field, message){
    document.getElementById(field + "Error").textContent = message;
}

function clearError(field){
    document.getElementById(field + "Error").textContent = "";
}

function validateFullname(){
    const value = fullname.value.trim();
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;

    if(value === ""){
        showError("fullname","Không được để trống");
        return false;
    }
    if(value.length < 3){
        showError("fullname","Ít nhất 3 ký tự");
        return false;
    }
    if(!regex.test(value)){
        showError("fullname","Chỉ chứa chữ cái");
        return false;
    }

    clearError("fullname");
    return true;
}

function validateEmail(){
    const value = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(value === ""){
        showError("email","Không được để trống");
        return false;
    }
    if(!regex.test(value)){
        showError("email","Sai định dạng");
        return false;
    }

    clearError("email");
    return true;
}

function validatePhone(){
    const value = phone.value.trim();
    const regex = /^0\d{9}$/;

    if(value === ""){
        showError("phone","Không được để trống");
        return false;
    }
    if(!regex.test(value)){
        showError("phone","Phải 10 số, bắt đầu bằng 0");
        return false;
    }

    clearError("phone");
    return true;
}

function validatePassword(){
    const value = password.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(value === ""){
        showError("password","Không được để trống");
        return false;
    }
    if(!regex.test(value)){
        showError("password","Ít nhất 8 ký tự, có hoa, thường, số");
        return false;
    }

    clearError("password");
    return true;
}

function validateConfirm(){
    if(confirmPassword.value !== password.value){
        showError("confirm","Không khớp mật khẩu");
        return false;
    }

    clearError("confirm");
    return true;
}

function validateGender(){
    const gender = document.querySelector('input[name="gender"]:checked');

    if(!gender){
        showError("gender","Chọn giới tính");
        return false;
    }

    clearError("gender");
    return true;
}

function validateTerms(){
    if(!terms.checked){
        showError("terms","Bạn phải đồng ý");
        return false;
    }

    clearError("terms");
    return true;
}

form.addEventListener("submit", function(e){
    e.preventDefault();

    const valid =
        validateFullname() &&
        validateEmail() &&
        validatePhone() &&
        validatePassword() &&
        validateConfirm() &&
        validateGender() &&
        validateTerms();

    if(valid){
        form.style.display = "none";
        success.textContent = "Đăng ký thành công 🎉 " + fullname.value;
    }
});

const togglePass = document.getElementById("togglePass");

togglePass.addEventListener("click", function(){
    password.type = password.type === "password" ? "text" : "password";
});

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

password.addEventListener("input", function(){
    const value = password.value;
    let score = 0;

    if(value.length >= 6) score++;
    if(/[A-Z]/.test(value)) score++;
    if(/[0-9]/.test(value)) score++;
    if(/[^A-Za-z0-9]/.test(value)) score++;

    if(score <= 1){
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
        strengthText.textContent = "Yếu";
    } 
    else if(score <= 3){
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";
        strengthText.textContent = "Trung bình";
    } 
    else{
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        strengthText.textContent = "Mạnh";
    }
});

const nameCount = document.getElementById("nameCount");

fullname.addEventListener("input", function(){
    let length = fullname.value.length;

    if(length > 50){
        fullname.value = fullname.value.slice(0,50);
        length = 50;
    }

    nameCount.textContent = length + "/50";
});