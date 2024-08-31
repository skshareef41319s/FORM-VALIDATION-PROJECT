document.getElementById('registrationForm').onsubmit = function (event) {
    // Prevent form submission
    event.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Flags for validation
    let isValid = true;

    // Name validation
    if (fullName.length < 5) {
        document.getElementById('nameError').innerText = 'Name must be at least 5 characters long';
        document.getElementById('fullName').classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('nameError').innerText = '';
        document.getElementById('fullName').classList.remove('invalid');
    }

    // Email validation
    if (!email.includes('@') || !validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Enter a valid email address';
        document.getElementById('email').classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('emailError').innerText = '';
        document.getElementById('email').classList.remove('invalid');
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (phone === '123456789' || !phoneRegex.test(phone)) {
        document.getElementById('phoneError').innerText = 'Enter a valid 10-digit phone number';
        document.getElementById('phone').classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('phoneError').innerText = '';
        document.getElementById('phone').classList.remove('invalid');
    }

    // Password validation
    if (password.length < 8 || password.toLowerCase() === 'password' || password.toLowerCase() === fullName.toLowerCase()) {
        document.getElementById('passwordError').innerText = 'Password is not strong enough';
        document.getElementById('password').classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('passwordError').innerText = '';
        document.getElementById('password').classList.remove('invalid');
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match';
        document.getElementById('confirmPassword').classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').innerText = '';
        document.getElementById('confirmPassword').classList.remove('invalid');
    }

    // If all fields are valid
    if (isValid) {
        // Display success notification
        showSuccessMessage();
        // Reset form fields after successful submission
        document.getElementById('registrationForm').reset();
        // Reset strength bar
        strengthBar.classList.remove('weak', 'medium', 'strong');
        strengthBar.style.width = '0%';
    }
};

// Email format validation function
function validateEmail(email) {
    // Simple email regex for demonstration
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

// Adding onchange events for real-time validation feedback
document.getElementById('fullName').onchange = validateFullName;
document.getElementById('email').onchange = validateEmailField;
document.getElementById('phone').onchange = validatePhone;
document.getElementById('password').onchange = validatePassword;
document.getElementById('confirmPassword').onchange = validateConfirmPassword;

// Validation Functions
function validateFullName() {
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName.length < 5) {
        document.getElementById('nameError').innerText = 'Name must be at least 5 characters long';
        document.getElementById('fullName').classList.add('invalid');
        return false;
    } else {
        document.getElementById('nameError').innerText = '';
        document.getElementById('fullName').classList.remove('invalid');
        return true;
    }
}

function validateEmailField() {
    const email = document.getElementById('email').value.trim();
    if (!email.includes('@') || !validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Enter a valid email address';
        document.getElementById('email').classList.add('invalid');
        return false;
    } else {
        document.getElementById('emailError').innerText = '';
        document.getElementById('email').classList.remove('invalid');
        return true;
    }
}

function validatePhone() {
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (phone === '123456789' || !phoneRegex.test(phone)) {
        document.getElementById('phoneError').innerText = 'Enter a valid 10-digit phone number';
        document.getElementById('phone').classList.add('invalid');
        return false;
    } else {
        document.getElementById('phoneError').innerText = '';
        document.getElementById('phone').classList.remove('invalid');
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value.trim();
    if (password.length < 8 || password.toLowerCase() === 'password' || password.toLowerCase() === fullName.toLowerCase()) {
        document.getElementById('passwordError').innerText = 'Password is not strong enough';
        document.getElementById('password').classList.add('invalid');
        return false;
    } else {
        document.getElementById('passwordError').innerText = '';
        document.getElementById('password').classList.remove('invalid');
        return true;
    }
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match';
        document.getElementById('confirmPassword').classList.add('invalid');
        return false;
    } else {
        document.getElementById('confirmPasswordError').innerText = '';
        document.getElementById('confirmPassword').classList.remove('invalid');
        return true;
    }
}

// Show/Hide Password Toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

// Repeat for Confirm Password
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

// Password Strength Indicator
const strengthBar = document.getElementById('strengthBar');

passwordInput.addEventListener('input', function () {
    const strength = calculateStrength(passwordInput.value);
    updateStrengthBar(strength);
});

function calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

function updateStrengthBar(strength) {
    strengthBar.classList.remove('weak', 'medium', 'strong');
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthBar.style.width = '30%'; // Weak: 30%
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        strengthBar.style.width = '60%'; // Medium: 60%
    } else {
        strengthBar.classList.add('strong');
        strengthBar.style.width = '100%'; // Strong: 100%
    }
}

// Success Notification
function showSuccessMessage() {
    // Create alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.role = 'alert';
    alertDiv.innerText = 'Form submitted successfully!';
    
    // Insert alert before the form
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
