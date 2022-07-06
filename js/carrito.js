document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await fetch('../js/api.json');
        const data = await res.json()
        drawCards(data);
    } catch (error) {
        console.log(error);
    }
}

const drawCards = data => {
    data.forEach(producto => {
        console.log(producto)
    })
}