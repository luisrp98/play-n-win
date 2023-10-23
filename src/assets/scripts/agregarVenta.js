export function addSale() {
    const numeroOrden = document.getElementById('modal-num-order').textContent
    const vendedorSelect = document.getElementById('vendedor-select').value
    const fechaInput = document.getElementById('fecha-input').value

    const tbody = document.getElementById('cart-body')
    const rows = tbody.getElementsByTagName('tr')
    const total = document.getElementById('modal-total-amount').value
    const rowData = []

    // Recorre todas las filas
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const cells = row.getElementsByTagName('td')

        if (cells.length === 4) {
            // Asegúrate de que haya 4 celdas por fila
            const title = cells[0].textContent
            const price = cells[1].textContent
            const quantity = parseInt(cells[2].textContent)
            const subtotal = cells[3].textContent

            // Crea un objeto con los datos de la fila
            const rowObject = {
                title: title,
                price: price,
                quantity: quantity,
                subtotal: subtotal,
            }
            // Agrega el objeto al array
            rowData.push(rowObject)
        }
    }
    const nuevaVenta = {
        'numero-de-orden': numeroOrden,
        productos: [], // Inicializa un array vacío para los productos
        vendedor: vendedorSelect,
        fecha: fechaInput,
        total: total,
    }

    nuevaVenta.productos = rowData

    fetch('https://6534761be1b6f4c59046be6a.mockapi.io/api/games/ventas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaVenta),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Venta agregada exitosamente:', data)
            // Cierra el modal o realiza cualquier otra acción necesaria
        })
        .catch((error) => {
            console.error('Error al agregar la venta:', error)
        })
}
