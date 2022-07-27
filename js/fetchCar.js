import { addCar, drawCar, btnAction } from './carrito.js';
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const filtro = document.getElementById('filtro')
const search = document.getElementsByClassName('search_box')[0]
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

let carr = []
let fillData = []

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (window.localStorage.getItem('carr')) {
        carr = JSON.parse(window.localStorage.getItem('carr'))
        drawCar()
        // contar(data);
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

const filtrar = (data, keyword) => {
    //search keyword from data array by name
    fillData = Array.from(data.filter(word => word.title.toLowerCase().indexOf(keyword) > -1));
    console.log(fillData);
}



