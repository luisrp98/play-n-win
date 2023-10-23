const btn_sell = document.querySelector('.btn-sell')

btn_sell.addEventListener('click', () => {
    console.log('Sell')
})

// Selecciona el botón "Cancelar" en el modal
const btnCancel = document.getElementById('btn-cancelar');

// Selecciona el modal
const modal = document.querySelector('.modal-bg');

// Agrega un controlador de eventos al botón "Cancelar"
btnCancel.addEventListener('click', () => {
    // Oculta el modal
    modal.style.display = 'none';
});

