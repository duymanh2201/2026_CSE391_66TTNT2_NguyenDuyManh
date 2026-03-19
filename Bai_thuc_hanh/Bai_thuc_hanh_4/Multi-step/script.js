let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });

  progressBar.style.width = ((index + 1) / steps.length) * 100 + "%";
}

function nextStep() {
  if (!validateStep()) return;

  currentStep++;
  showStep(currentStep);

  if (currentStep === 2) showResult();
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function showError(id, message) {
  document.getElementById(id + "Error").innerText = message;
}

function clearError() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");
}

function validateStep() {
  clearError();

  // STEP 1
  if (currentStep === 0) {
    let valid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;

    if (fullname === "") {
      showError("fullname", "Không được để trống");
      valid = false;
    }

    if (dob === "") {
      showError("dob", "Chọn ngày sinh");
      valid = false;
    }

    if (gender === "") {
      showError("gender", "Chọn giới tính");
      valid = false;
    }

    return valid;
  }

  // STEP 2
  if (currentStep === 1) {
    let valid = true;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (!email.includes("@")) {
      showError("email", "Email không hợp lệ");
      valid = false;
    }

    if (password.length < 6) {
      showError("password", "Ít nhất 6 ký tự");
      valid = false;
    }

    if (password !== confirm) {
      showError("confirm", "Mật khẩu không khớp");
      valid = false;
    }

    return valid;
  }

  return true;
}

function showResult() {
  const result = document.getElementById("result");

  result.innerHTML = `
    <p><b>Họ tên:</b> ${fullname.value}</p>
    <p><b>Ngày sinh:</b> ${dob.value}</p>
    <p><b>Giới tính:</b> ${gender.value}</p>
    <p><b>Email:</b> ${email.value}</p>
  `;
}

// init
showStep(currentStep);