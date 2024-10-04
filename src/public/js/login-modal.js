//Thiết lập các tính năng cho modal
const modalOverlay = document.querySelector('.modal-overlay');
const checkbox = document.getElementById('agreement');
const erroMsg = document.getElementById('Ck-msg');
const btnModal = document.getElementById('btn-login-modal')
const formLogin = document.getElementById('form-get-email');
const erroMsgEmail = document.getElementById('errorMsg-input-email');
const emailInput = document.getElementById('emailInput');

// Biểu thức chính quy để kiểm tra định dạng email.
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

console.log(document.getElementById('open-modal-login'))

// addEventListener display modal.
document.getElementById('open-modal-login').addEventListener('click', function() {

    document.querySelector('.modal-overlay').style.display = 'flex';
    document.querySelector('.modal-content').style.display = 'flex';

    setTimeout(() => {
        document.querySelector('.modal-overlay').classList.add('show')
        document.querySelector('.modal-content').classList.add('show')
    }, 10)

    //disabled scroll when open Modal
    document.body.classList.add('no-scroll')

    //reset Modal when close/open
    resetModalState()
})

// addEventListener close Modal.
document.getElementById('close-modal').addEventListener('click', function() {

    // Bắt đầu hiệu ứng mờ dần để đóng modal
    document.querySelector('.modal-content').classList.remove('show');
    document.querySelector('.modal-content').classList.add('closing');
    document.querySelector('.modal-overlay').classList.remove('show');

    // Đợi hiệu ứng mờ dần hoàn tất trước khi hoàn toàn ẩn modal
    setTimeout(() => {
        document.querySelector('.modal-content').style.display = 'none';
        document.querySelector('.modal-overlay').style.display = 'none';
        document.querySelector('.modal-content').classList.remove('closing');
    }, 500);

    //enable scroll when open Modal
    document.body.classList.remove('no-scroll')
})


// addEventListener "input" khi người dùng nhập liệu
checkbox.addEventListener('change', function() {
    if(this.checked) {
        erroMsg.style.display = "none";
        btnModal.disabled = false;
        btnModal.style.opacity = 1;
    }
    else {
        erroMsg.style.display = "block";
        btnModal.disabled = true;
        btnModal.style.opacity = 0.5;
    }
})

emailInput.addEventListener('input', function(e) {
    // check value input is empty
    if(emailInput.value === '') {
        erroMsgEmail.style.display = 'block';
        erroMsgEmail.innerHTML = 'Vui lòng nhập email của bạn';
    }
    else {
        // Kiểm tra email có đúng định dạng không
        if(emailPattern.test(emailInput.value)) {
            erroMsgEmail.style.display = 'none';
            emailInput.style.backgroundColor = '#ffffff';
            emailInput.style.borderColor = '#24adf7';
        }
        else {
            erroMsgEmail.style.display = 'block';
            erroMsgEmail.innerHTML = 'Sai định dạng email';
            emailInput.style.backgroundColor = '#f8f3f0';
            emailInput.style.borderColor = '#f1d1a0';
        }
    }

})

function resetModalState() {
    emailInput.value = '';
    checkbox.checked = true;
    erroMsgEmail.style.display = 'none';
    emailInput.style.backgroundColor = '#ffffff';
    emailInput.style.borderColor = '#24adf7';
    erroMsg.style.display = "none";
    btnModal.style.opacity = 1;
}