const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const filtro = document.getElementById('filtro')
const search = document.getElementsByClassName('search_box')[0]
const ulContent = document.getElementsByClassName('ulContent')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

let carr = []
let fillData = []

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (localStorage.getItem('carr')) {
        carr = JSON.parse(localStorage.getItem('carr'))
        drawCar()
    }
});
cards.addEventListener('click', e => {
    addCar(e)
})

items.addEventListener('click', e => {
    btnAction(e)
})
console.log(search);

search.addEventListener('change', e => {
    console.log(e.target.value);
    fetchData(e.target.value)
});

const fetchData = async (keyword = '') => {
    try {
        const res = await fetch('../js/api.json');
        const data = await res.json();
        if (keyword) {
            filtrar(data, keyword);
            drawCards(fillData);
        } else {
            drawCards(data);
        }
    } catch (error) {
        console.log(error);
    }
}

const drawCards = data => {
    cards.innerHTML = ''
    data.forEach(producto => {
        templateCard.querySelector('img').setAttribute('src', producto.img)
        templateCard.querySelector('h2').textContent = producto.title
        templateCard.querySelector('.precio').textContent = producto.price
        templateCard.querySelector('.description').textContent = producto.description
        templateCard.querySelector('.btn-outline-primary').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCar = e => {
    if (e.target.classList.contains('btn-outline-primary')) {
        setCar(e.target.parentElement);
    }
    e.stopPropagation()
}

const setCar = object => {
    const producto = {
        id: object.querySelector('.btn-outline-primary').dataset.id,
        title: object.querySelector('h2').textContent,
        price: object.querySelector('.precio').textContent,
        description: object.querySelector('.description').textContent,
        cantidad: 1
    }
    if (carr.hasOwnProperty(producto.id)) {
        producto.cantidad = carr[producto.id].cantidad + 1
    }
    carr[producto.id] = { ...producto }
    drawCar();
}

const drawCar = () => {
    items.innerHTML = ''
    console.log(carr);
    if (!Object.values(carr).some(e => e === null)) {
        Object.values(carr).forEach((producto) => {
            templateCarrito.querySelector('th').textContent = producto.id
            templateCarrito.querySelectorAll('td')[0].textContent = producto.title
            templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
            templateCarrito.querySelector('.btn-info').dataset.id = producto.id
            templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
            templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price
            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
        })
        items.appendChild(fragment);
        drawFooter();
        localStorage.setItem('carr', JSON.stringify(carr));
    } else {
        localStorage.clear();
    }
}

const drawFooter = () => {
    footer.innerHTML = '';
    if (Object.keys(carr).length == 0) {
        footer.innerHTML = '';
        return
    }

    const cantidades = Object.values(carr).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const total = Object.values(carr).reduce((acc, { cantidad, price }) => acc + cantidad * price, 0)

    templateFooter.querySelectorAll('td')[0].textContent = cantidades
    templateFooter.querySelector('span').textContent = total

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carr = [];
        drawCar();
    })


}

const btnAction = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carr[e.target.dataset.id]
        producto.cantidad++
        carr[e.target.dataset.id] = { ...producto }
        drawCar();
    }
    if (e.target.classList.contains('btn-danger')) {
        const producto = carr[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carr[e.target.dataset.id]
            localStorage.removeItem(carr[e.target.dataset.id]);
        }
        drawCar();
    }
    e.stopPropagation();

}

const filtrar = (data, keyword) => {
    //search keyword from data array by name
    fillData = Array.from(data.filter(word => word.title.toLowerCase().indexOf(keyword) > -1));
    // drawCards(fillData);
    console.log(fillData);


}



