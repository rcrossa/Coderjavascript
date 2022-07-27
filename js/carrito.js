const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carr = []

document.addEventListener('DOMContentLoaded', () => {
    if (window.localStorage.getItem('carr')) {
        carr = JSON.parse(window.localStorage.getItem('carr'))
        drawCar()
        // contar(data);
    }
});

export const addCar = e => {
    if (e.target.classList.contains('btn-outline-primary')) {
        setCar(e.target.parentElement);
    }
    e.stopPropagation()
}

export const setCar = object => {
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

export const drawCar = () => {
    items.innerHTML = ''
    console.log(carr);
    if (!Object.values(carr).some(e => e == null)) {
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
        window.localStorage.removeItem('carr');
        window.localStorage.setItem('carr', JSON.stringify(carr.filter(e => e !== null)));
    }
}
export function contar(data) {
    console.log('son' + data.length);
}
export const drawFooter = () => {
    footer.innerHTML = '';
    if (Object.keys(carr).length == 0) {
        footer.innerHTML = '';
        return
    }

    const cantidades = Object.values(carr).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const total = Object.values(carr).reduce((acc, { cantidad, price }) => acc + (cantidad * price), 0)

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

export const btnAction = e => {
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
        }
        drawCar();
    }
    e.stopPropagation();
}



