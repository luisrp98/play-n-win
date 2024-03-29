export function addRowCart() {
    const productoSelect = document.getElementById('producto-select')
    const cantidadInput = document.getElementById('cantidad-input')

    const cartBody = document.getElementById('cart-body')

    // Verifica que se haya seleccionado un producto y que la cantidad sea mayor que 0
    if (productoSelect.value && cantidadInput.value > 0) {
        // Realiza una solicitud a la API para obtener el precio del producto
        fetch('https://6534761be1b6f4c59046be6a.mockapi.io/api/games/videojuegos')
            .then((response) => response.json())
            .then((data) => {
                // Encuentra el objeto del producto seleccionado en la respuesta de la API
                const productoInfo = data.find(
                    (producto) => producto.titulo === productoSelect.value
                )

                if (productoInfo) {
                    // Obtiene el precio del producto desde el objeto
                    const precio = productoInfo.precio

                    // Calcula el subtotal
                    const subtotal = precio * cantidadInput.value

                    // Crea una nueva fila con los datos del producto
                    const newRow = document.createElement('tr')
                    newRow.innerHTML = `
                            <td>${productoSelect.value}</td>
                            <td>$${precio.toFixed(2)}</td>
                            <td>${cantidadInput.value}</td>
                            <td>$${subtotal.toFixed(2)}</td>
                        `

                    // Agrega la fila a la tabla
                    cartBody.appendChild(newRow)

                    const total = document.getElementById('modal-total-amount')
                    let totalActual = parseFloat(total.textContent.replace('$', '')) // Convierte el contenido actual a un número
                    const nuevoTotal = totalActual + parseFloat(subtotal.toFixed(2))
                    total.innerHTML = `$${nuevoTotal.toFixed(2)}`

                    // Limpia los campos del formulario
                    productoSelect.selectedIndex = 0
                    cantidadInput.value = ''
                } else {
                    console.error('El producto seleccionado no se encontró en la API.')
                }
            })
            .catch((error) => {
                console.error(
                    'Error al cargar la lista de productos desde la API: ',
                    error
                )
            })
    } else {
        alert('Por favor introduce un item y cantidad correctamente')
    }
}
