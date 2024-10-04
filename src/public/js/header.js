const dropdownBtn = document.querySelectorAll('.dropdown-container button');
const dropdownMenus = {
    'dropdown-menu': document.getElementById('dropdown-menu'),
    'dropdown-area': document.getElementById('dropdown-area')
}

function setupDropdown(button, menuId) {
    const menu = dropdownMenus[menuId];

    button.addEventListener('mouseenter', () => {
        menu.classList.add('show');
    })

    button.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if(!menu.matches(':hover')){
                menu.classList.remove('show');
            }
        }, 100)
    })

    menu.addEventListener('mouseleave', () => {
        menu.classList.remove('show');
    })
}

setupDropdown(dropdownBtn[0], 'dropdown-menu');
setupDropdown(dropdownBtn[1], 'dropdown-area')