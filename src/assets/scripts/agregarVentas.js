
//Obten una referencia al boton "Agregar ventas" en el modal
const btnSubmit = document.getElementById('btn-submit');

btnSubmit.addEventListener('click', function () {
    console.log('Botón "Agregar ventas" clicado');
    const numeroOrden = document.getElementById('modal-num-order').textContent;
    const productoSelect = document.getElementById('producto-select').value;
    const cantidadInput = document.getElementById('cantidad-input').value;
    const vendedorSelect = document.getElementById('vendedor-select').value;
    const fechaInput = document.getElementById('fecha-input').value;

    if (!productoSelect || !cantidadInput || !vendedorSelect || !fechaInput) {
        console.error('Por favor, complete todos los campos del formulario.');
        return;
    }

    const precio = parseFloat(document.querySelector('#cart-body tr.selected td[data-precio]').dataset.precio);

    const subtotal = precio * cantidadInput;
    const total = subtotal; // El total es igual al subtotal en este ejemplo

    const nuevaVenta = {
        "numero-de-orden": numeroOrden,
        "productos": [
            {
                "titulo": productoSelect,
                "precio": precio.toFixed(2),
                "cantidad": cantidadInput,
                "subtotal": subtotal.toFixed(2)
            }
        ],
        "vendedor": vendedorSelect,
        "fecha": fechaInput,
        "total": total.toFixed(2)
    };

    fetch('https://6534761be1b6f4c59046be6a.mockapi.io/api/games/ventas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaVenta)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Venta agregada exitosamente:', data);
        // Cierra el modal o realiza cualquier otra acción necesaria
    })
    .catch(error => {
        console.error('Error al agregar la venta:', error);
    });
});
