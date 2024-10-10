// Thiết lập các hằng số
const FADE_DURATION = 500;
const SHOW_CLASS = 'show';
const CLOSING_CLASS = 'closing';
const NO_SCROLL_CLASS = 'no-scroll';

// DOM Elements
const modalMain = document.getElementById('modal-main');
const modalMainContent = document.getElementById('modal-main-content');
const modalRegisterContent = document.getElementById('modal-register');
const checkbox = document.querySelectorAll('.agreement');
const erroMsg = document.querySelectorAll('.Ck-msg');
const btnSwitchLogin = document.getElementById('btn-switch-to-login');
const btnRegister = document.getElementById('btn-register');
const formLogin = document.getElementById('form-get-email');
const modalLoginContent = document.getElementById('modal-Login');
const linkToRegister = document.getElementById('link-to-register');
const emailInput = document.getElementById('emailInput');
const emailLogin = document.getElementById('emailInput-to-login');
const btnLogin = document.getElementById('btn-login');

console.log('linkToRegister')

// Kiểm tra xem các phần tử có tồn tại không
function elementExists(element) {
    return element !== null;
}

function toggleModal(modal, show, displaystyle = 'flex') {
    if(elementExists(modal)) {
        modal.style.display = show ? displaystyle: 'none';
        if(show) {
            setTimeout(() => modal.classList.add(SHOW_CLASS), 10);
        } else {
            modal.classList.remove(SHOW_CLASS);
            modal.classList.remove(CLOSING_CLASS);
            setTimeout(() => modal.classList.remove(CLOSING_CLASS), FADE_DURATION);
        }
    }
}

function ShowModal() {
    toggleModal(modalMain, true);
    toggleModal(modalMainContent, true);
    document.body.classList.add(NO_SCROLL_CLASS);
    resetAllFields();
}

function closeModal() {
    toggleModal(modalRegisterContent, false);
    toggleModal(modalLoginContent, false);
    toggleModal(modalMain, false);
    document.body.classList.remove(NO_SCROLL_CLASS);
}

// Hàm chuyển đổi giữa các modal
function switchToLoginModal(event) {
    event.preventDefault();
    toggleModal(modalMainContent, false);
    toggleModal(modalLoginContent, true);
    emailLogin.value = emailInput.value;
}

// Sự kiện chuyển sang modal đăng ký
function linkToRegisterModal(event) {
    event.preventDefault();
    const displayEmail = document.querySelector('.display-email');
    toggleModal(modalLoginContent, false);
    toggleModal(modalRegisterContent, true);
    displayEmail.innerHTML = emailLogin.value;
}

// Xử lý checkbox thay đổi
function handleCheckboxChange() {
    document.querySelectorAll('.hide-btn').forEach((btn, index) => {
        const isChecked = checkbox[index].checked;
        erroMsg[index].style.display = isChecked ? 'none' : 'block';
        btn.disabled = !isChecked;
        btn.style.opacity = isChecked ? 1 : 0.5;
    });
}

// Hàm đặt lại trạng thái form 
function resetAllFields() {
    validateRules.forEach(({ inputField, errorId }) => {
        const inputEl = document.getElementById(inputField);
        const errorEl = document.getElementById(errorId);
        if (inputEl && errorEl) {
            inputEl.value = '';
            errorEl.style.display = 'none';
            inputEl.style.backgroundColor = '#ffffff';
            inputEl.style.borderColor = '#24adf7';
        }
    });

    checkbox.forEach((el) => (el.checked = true));
    erroMsg.forEach((msg) => (msg.style.display = 'none'));

    [btnSwitchLogin, btnRegister, btnLogin].forEach((btn) => {
        btn.style.opacity = 1;
        btn.disabled = false;
    });
}

// Hàm kiểm tra tính hợp lệ của từng trường
function validateField(rule) {
    const inputEl = document.getElementById(rule.inputField);
    const errorEl = document.getElementById(rule.errorId);

    if (elementExists(inputEl) && elementExists(errorEl)) {
        const value = inputEl.value.trim();
        if (!value) {
            showError(inputEl, errorEl, rule.checkEmpty);
        } else if (!rule.validate(value)) {
            showError(inputEl, errorEl, rule.errorMessage);
        } else {
            clearError(inputEl, errorEl);
        }
    }
}

// Hiển thị lỗi
function showError(inputEl, errorEl, message) {
    errorEl.style.display = 'block';
    errorEl.innerHTML = message;
    inputEl.style.backgroundColor = '#f8f3f0';
    inputEl.style.borderColor = '#f1d1a0';
}

// Xóa lỗi
function clearError(inputEl, errorEl) {
    errorEl.style.display = 'none';
    inputEl.style.backgroundColor = '#ffffff';
    inputEl.style.borderColor = '#24adf7';
}

// Gán sự kiện 'input' cho các trường
function addInputEventListeners() {
    validateRules.forEach((rule) => {
        const inputEl = document.getElementById(rule.inputField);
        inputEl?.addEventListener('input', () => validateField(rule));
    });
}

// Gọi hàm để gán sự kiện sau khi DOM đã tải xong
window.onload = () => {
    addInputEventListeners();
    document.getElementById('open-modal-login')?.addEventListener('click', ShowModal);
    document.getElementById('close-modal')?.addEventListener('click', closeModal);
    document.getElementById('close-modal-register')?.addEventListener('click', closeModal);
    document.getElementById('close-modal-login')?.addEventListener('click', closeModal);

    btnSwitchLogin?.addEventListener('click', switchToLoginModal);
    linkToRegister?.addEventListener('click', linkToRegisterModal);
    checkbox?.forEach((check) => check.addEventListener('change', handleCheckboxChange));
};



// Các quy tắc kiểm tra
const validateRules = [
    {
        inputField: 'emailInput',
        errorId: 'errorMsg-input-email',
        validate: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()),
        errorMessage: 'Sai định dạng email.',
        checkEmpty: 'Vui lòng nhập email của bạn.'
    },
    {
        inputField: 'emailInput-to-login',
        errorId: 'errorMsg-input-email-to-login',
        validate: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()),
        errorMessage: 'Sai định dạng email.',
        checkEmpty: 'Vui lòng nhập email của bạn.'
    },
    {
        inputField: 'nameInput',
        errorId: 'errorMsg-input-name',
        validate: (value) => value.trim() !== '' && value.trim().length >= 5,
        errorMessage: 'Họ tên tối thiểu 5 ký tự.',
        checkEmpty: 'Vui lòng nhập họ và tên.'
    },
    {
        inputField: 'phoneInput',
        errorId: 'errorMsg-input-phone',
        validate: (value) => /^[0-9]{10,11}$/.test(value.trim()),
        errorMessage: 'Số điện thoại phải là số và tối thiểu 10 ký tự.',
        checkEmpty: 'Vui lòng nhập số điện thoại.'
    },
    {
        inputField: 'passwordInput-to-register',
        errorId: 'errorMsg-input-password-to-register',
        validate: (value) => value.trim() != '' && value.trim().length >= 8,
        errorMessage: 'Mật khẩu tối thiểu phải 8 ký tự.',
        checkEmpty: 'Vui lòng nhập mật khẩu.'
    },
    {
        inputField: 'passwordInput-to-login',
        errorId: 'errorMsg-input-password-to-login',
        validate: (value) => value.trim() != '' && value.trim().length >= 8,
        errorMessage: 'Mật khẩu tối thiểu phải 8 ký tự.',
        checkEmpty: 'Vui lòng nhập mật khẩu.'
    }
]




