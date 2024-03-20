const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validar las entradas
    if(newItem === '') {
        alert('Por favor agrega un producto');
        return;
    }

    // Llamamos a la función que crea los productos y los agrega al DOM
    addItemToDom(newItem);

    // Agregar producto a local storage
    addItemToStorage(newItem);
    
    // Usamos la función check UI para volver a mostrar el filtro y el botón de clear all
    checkUI();

    itemInput.value = '';
}

function addItemToDom(item) {
    // Crear producto para la lista
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Se agrega el producto (li) al DOM
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    // Agregar nuevos productos(items) al array
    itemsFromStorage.push(item);

    // Convertir a JSON string y guardarlo en local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
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
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();