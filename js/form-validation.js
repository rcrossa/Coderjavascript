(() => {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles and button.
    const forms = document.querySelectorAll('form.needs-validation')
    const btnSend = document.getElementById('finalizarCheckout');

    btnSend.addEventListener('click', (event) => {
        let flag = false;
        event.preventDefault();
        Array.from(forms).forEach(form => {

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                flag = false
            } else {
                flag = true;
            }
            form.classList.add('was-validated')
        })
        console.log("test");
        if (flag) {
            localStorage.removeItem('carr');
            alert('Gracias por tu compra.')
            location.assign('../index.html')
        }
    })
})()