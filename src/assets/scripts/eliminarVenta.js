import { generateTableSales } from './generarTablaVentas.js'

export function deleteSale() {
    const checkboxesMarcados = document.querySelectorAll('input[type="checkbox"]:checked')

    let text =
        'Estás apunto de eliminar estos registros\nEsta acción no puede ser deshecha'
    if (confirm(text) == true) {
        checkboxesMarcados.forEach((checkbox) => {
            const row = checkbox.closest('tr')
            const numDeOrden = row.cells[1].textContent

            const url = new URL(
                'https://6534761be1b6f4c59046be6a.mockapi.io/api/games/ventas'
            )
            url.searchParams.append('numero-de-orden', numDeOrden)

            fetch(url, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json() // Convierte la respuesta JSON en un objeto JavaScript
                    } else {
                        throw new Error('No se pudo obtener los datos') // Maneja el error si la respuesta no es "ok"
                    }
                })
                .then((data) => {
                    // Aquí puedes trabajar con los datos obtenidos, por ejemplo, imprimirlos en la consola
                    console.log(data[0].id)
                    fetch(
                        `https://6534761be1b6f4c59046be6a.mockapi.io/api/games/ventas/${data[0].id}`,
                        {
                            method: 'DELETE',
                        }
                    )
                        .then((res) => {
                            if (res.ok) {
                                return res.json()
                            }
                            // handle error
                        })
                        .then((task) => {
                            // Do something with deleted task
                        })
                        .catch((error) => {
                            // handle error
                        })
                })
                .catch((error) => {
                    // Maneja errores, por ejemplo, mostrando un mensaje de error en la consola
                    console.error(error)
                })
        })
    } else {
    }

    const ventasTableBody = document.querySelector('#sales-results tbody')

    while (ventasTableBody.firstChild) {
        ventasTableBody.removeChild(ventasTableBody.firstChild)
    }
    setTimeout(() => {
        generateTableSales()
    }, 1000)
}
