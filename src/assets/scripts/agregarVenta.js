export function addSale() {
    const numeroOrden = document.getElementById('modal-num-order').textContent
    const vendedorSelect = document.getElementById('vendedor-select').value
    const fechaInput = document.getElementById('fecha-input').value

    const tbody = document.getElementById('cart-body')
    const rows = tbody.getElementsByTagName('tr')
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
            alert(
                rowObject.title +
                    ' ' +
                    rowObject.price +
                    ' ' +
                    rowObject.quantity +
                    ' ' +
                    rowObject.subtotal
            )
            // Agrega el objeto al array
            rowData.push(rowObject)
        }
    }
    const nuevaVenta = {
        'numero-de-orden': numeroOrden,
        productos: [], // Inicializa un array vacío para los productos
        vendedor: vendedorSelect,
        fecha: fechaInput,
        total: total.toFixed(2),
    }

    nuevaVenta.productos = rowData
    console.log(nuevaVenta)

    // if (vendedorSelect === 'Selecciona una opción' || fechaInput === '') {
    //     alert('Por favor, completa la información.')
    //     return
    // }

    // alert(numeroOrden + vendedorSelect + fechaInput)
}
