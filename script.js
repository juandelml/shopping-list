const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validar las entradas
    if(newItem === '') {
        alert('Por favor agrega un producto');
        return;
    }

    // Crear producto para la lista
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Se agrega el producto (li) al DOM
    itemList.appendChild(li);
    
    // Usamos la función check UI para volver a mostrar el filtro y el botón de clear all
    checkUI();

    itemInput.value = '';
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        if(confirm('¿Estás seguro de que quieres eliminar el producto?')) {
            e.target.parentElement.parentElement.remove();

            checkUI();
        }
    }
}

function clearItems(e) {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    checkUI();
}

function checkUI() {
    const items = itemList.querySelectorAll('li');

    if(items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();