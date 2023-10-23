import { createModal } from '../assets/scripts/modal.js'
import { addRowCart } from '../assets/scripts/añadirFila.js'

const btn_sell = document.querySelector('.btn-sell')
const btn_add = document.querySelector('#btn-agregar')

btn_sell.addEventListener('click', () => {
    createModal('modal-sale')
})
// btn_add.addEventListener('DOMContentLoaded', function () {
//     // Code here waits to run until the DOM is loaded.
//     console.log('Aaaaaaa')
// })
// Agrega un oyente de eventos al elemento padre que ya existe (por ejemplo, el documento o algún contenedor existente).
document.addEventListener('click', function (event) {
    const target = event.target

    // Verifica si el elemento que desencadenó el evento es el botón "boton-agregar".
    if (target && target.id === 'btn-agregar') {
        addRowCart()
        // Aquí puedes realizar la lógica que deseas cuando se hace clic en el botón "boton-agregar".
        // Por ejemplo, puedes abrir el modal de venta correspondiente.
    }
})
