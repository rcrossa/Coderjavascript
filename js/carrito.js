const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

let carr = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
items.addEventListener('click', e => {
    addCar(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('../js/api.json');
        const data = await res.json()
        console.log(data);
        drawCards(data);
    } catch (error) {
        console.log(error);
    }
}

const drawCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('img').setAttribute('src', producto.img)
        templateCard.querySelector('h2').textContent = producto.title
        templateCard.querySelector('.precio').textContent = producto.price
        templateCard.querySelector('.description').textContent = producto.description
        templateCard.querySelector('.btn-success').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        // console.log(clone);
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const addCar = e => {

    if (e.target.classList.contains('btn-success')) {
        setCar(e.target.parentElement);
    }

    e.stopPropagation()
}

const setCar = object => {
    // console.log(object);
    const producto = {
        id: object.querySelector('.btn-success').dataset.id,
        title: object.querySelector('h2').textContent,
        price: object.querySelector('.precio').textContent,
        description: object.querySelector('.description').textContent,
        cantidad: 1
    }
    if (carr.hasOwnProperty(producto.id)) {
        producto.cantidad = carr[producto.id].cantidad + 1
    }
    carr[producto.id] = { ...producto }
    console.log(carr);
}