const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const date = document.getElementById("date");
const address = document.getElementById("address");
const note = document.getElementById("note");

const total = document.getElementById("total");
const count = document.getElementById("count");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");

const success = document.getElementById("success");

const prices = {
    "Áo":150000,
    "Quần":200000,
    "Giày":500000
};

function showError(id,msg){
    document.getElementById(id+"Error").textContent = msg;
}
    
function clearError(id){
    document.getElementById(id+"Error").textContent="";
}

function validateProduct(){

    if(product.value===""){
    showError("product","Hãy chọn sản phẩm");
    return false;
    }
    
    clearError("product");
    return true;
    
}

function validateQuantity(){

    const value = Number(quantity.value);
    
    if(!Number.isInteger(value) || value<1 || value>99){
    showError("quantity","Số lượng 1-99");
    return false;
    }
    
    clearError("quantity");
    return true;
    
}
function validateDate(){

    const inputDate = new Date(date.value);
    const today = new Date();
    
    const maxDate = new Date();
    maxDate.setDate(today.getDate()+30);
    
    if(!date.value){
    showError("date","Chọn ngày giao");
    return false;
    }
    
    if(inputDate < today){
    showError("date","Không được chọn ngày quá khứ");
    return false;
    }
    
    if(inputDate > maxDate){
    showError("date","Không quá 30 ngày");
    return false;
    }
    
    clearError("date");
    return true;
    
}

function validateAddress(){

    const value = address.value.trim();

    if(value.length<10){
    showError("address","Ít nhất 10 ký tự");
    return false;
    }

    clearError("address");
    return true;
}

function validateNote(){

    if(note.value.length>200){
    showError("note","Không quá 200 ký tự");
    return false;
    }
    
    clearError("note");
    return true;
    
}

function validatePay(){

    const pay = document.querySelector('input[name="pay"]:checked');
    
    if(!pay){
    showError("pay","Chọn phương thức thanh toán");
    return false;
    }
    
    clearError("pay");
    return true;
    
}

note.addEventListener("input",function(){

    const len = note.value.length;
    
    count.textContent = len + "/200";
    
    if(len>200){
    count.style.color="red";
    }else{
    count.style.color="gray";
    }
    
});

function updateTotal(){

    const p = product.value;
    const q = Number(quantity.value);
    
    if(prices[p] && q){
    const money = prices[p]*q;
    total.textContent =
    money.toLocaleString("vi-VN");
    } 
}
    
product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);

form.addEventListener("submit",function(e){

    e.preventDefault();
    
    const valid =
    validateProduct() &
    validateQuantity() &
    validateDate() &
    validateAddress() &
    validateNote() &
    validatePay();
    
    if(valid){
    
    confirmBox.style.display="block";
    
    const p = product.value;
    const q = quantity.value;
    
    const money =
    (prices[p]*q).toLocaleString("vi-VN");
    
    summary.textContent =
    "Sản phẩm: "+p+
    " | Số lượng: "+q+
    " | Tổng tiền: "+money+
    " | Ngày giao: "+date.value;
    
    }
    
});

confirmBtn.onclick = function(){

    confirmBox.style.display="none";
    form.style.display="none";
    
    success.textContent="Đặt hàng thành công 🎉";
    
    }
    
    cancelBtn.onclick = function(){
    confirmBox.style.display="none";
}

