console.log('buscarVentas Script llamado')

const apiURL = 'https://6534761be1b6f4c59046be6a.mockapi.io/api/games/ventas';

const imagenesJuegosMap = new Map([
    ['Horizon Zero Dawn', 'horizon.jpg'],
    ['Beyond: Two Souls', 'beyond.jpg'],
    ['Animal Crossing', 'animal.jpg'],
    ['The Last of Us', 'TLOU.jpg'],
    ['Until Dawn', 'untildawn.jpg'],
    ['Saints Row', 'saintsrow.jpg'],
    ['Wick', 'wick.jpg'],
    ['Outlast', 'outlast.jpg'],
    ['The Witcher 3: Wild Hunt', 'witcher.jpg'],
    ['Detroit: Become Human', 'detroit.jpg'],
    ['Doki Doki Literature Club!', 'doki.jpg'],
    ['The Binding of Isaac: Rebirth', 'isaac.jpg'],
    ['Injustice 2', 'injustice2.jpg'],
    ['Tekken 7', 'tekken7.jpg'],
    ['Crash Bandicoot N. Sane Trilogy', 'crash.jpg'],
    ['Call of Duty: Modern Warfare', 'cod.jpg'],
    ['Mario Kart 8 Deluxe', 'mariokart.jpg'],
    ['Mario Party Superstars', 'marioparty.jpg'],
    ['Cuphead', 'cuphead.jpg'],
    ['Horizon Forbidden West', 'horizon2.jpg']
]);

document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.querySelector('form');
    const filterSearch = document.querySelector('#filter-search');
    const titleRadio = document.querySelector('#title');
    const orderRadio = document.querySelector('#order');
    const sellersSelect = document.querySelector('#filter-sellers');
    const minPriceInput = document.querySelector('#min-price');
    const maxPriceInput = document.querySelector('#max-price');
    const minDateInput = document.querySelector('#min-date');
    const maxDateInput = document.querySelector('#max-date');
    const btnSubmit = document.querySelector('#btn-submit');
    const btnClear = document.querySelector('#btn-clear');

    // Agrega un evento de escucha para el envío del formulario
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Realiza la búsqueda aquí y muestra los resultados
        buscarVentas();
    });

    // Agrega un evento de escucha para el botón de limpiar filtro
    btnClear.addEventListener('click', () => {
        // Restablece todos los campos del formulario a sus valores iniciales
        filterForm.reset();
        // Realiza la búsqueda sin filtros
        buscarVentas();
    });

    function buscarVentas() {
        // Recopila los valores de los filtros
        const searchText = filterSearch.value.toLowerCase(); // Convierte el título buscado a minúsculas
        const searchType = titleRadio.checked ? 'title' : orderRadio.checked ? 'order' : '';
        const selectedSeller = sellersSelect.value;
        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);
        const minDate = minDateInput.value;
        const maxDate = maxDateInput.value;

        console.log("Vendedor seleccionado:", selectedSeller);

        // Realiza la lógica de búsqueda y muestra los resultados en la tabla
        // Puedes usar fetch para obtener los datos de la API y aplicar los filtros en el servidor si es necesario.
        // Luego, actualiza la tabla con los resultados.
        // Ejemplo:
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                try {
                    const filteredData = data.filter(venta => {
                        console.log("Comparando con vendedor:", venta.vendedor);
                        console.log('BUSQUEDAPORORDEN' + searchType);

                        if (searchType === 'title') {
                            // Filtrado por título
                            return (
                                venta.productos.some(producto => producto.titulo.toLowerCase().includes(searchText))
                            );
                        } else if (searchType === 'order') {
                            // Filtrado por número de orden
                            return (
                                venta['numero-de-orden'].toLowerCase().includes(searchText)
                            );
                        } else {
                            // Filtrado solo por vendedor
                            return (venta.vendedor === selectedSeller);
                        }
                    });

                    if (minPrice || maxPrice) {
                        filteredData = filteredData.filter(venta => {
                            const precios = venta.productos.map(producto => parseFloat(producto.precio));
                            console.log('Precios en la venta:', precios);
                            // Filtrado por precio máximo y mínimo
                            return (
                                (!minPrice || venta.productos.some(producto => parseFloat(producto.precio) >= minPrice)) &&
                                (!maxPrice || venta.productos.some(producto => parseFloat(producto.precio) <= maxPrice))
                            );
                        });
                    }

                    if (minDate || maxDate) {
                        filteredData = filteredData.filter(venta => {
                            // Filtrado por fecha
                            return (
                                (!minDate || new Date(venta.fecha) >= new Date(minDate)) &&
                                (!maxDate || new Date(venta.fecha) <= new Date(maxDate))
                            );
                        });
                    }



                    // Actualiza la tabla con los resultados filtrados
                    actualizarTablaConResultados(filteredData);
                } catch (error) {
                    console.error('Error al filtrar los datos:', error);
                }
            })
            .catch(error => {
                console.error('Error al cargar datos:', error);
            });
    }

    function actualizarTablaConResultados(data) {
        const ventasTableBody = document.querySelector('#sales-results tbody');

        // Limpia la tabla actual
        while (ventasTableBody.firstChild) {
            ventasTableBody.removeChild(ventasTableBody.firstChild);
        }

        // Inserta los resultados filtrados en la tabla
        data.forEach(venta => {
            const newRow = ventasTableBody.insertRow();

            // Agrega las celdas para cada columna de la tabla
            const checkboxCell = newRow.insertCell(0);
            const orderNumberCell = newRow.insertCell(1);
            const dateCell = newRow.insertCell(2);
            const productCell = newRow.insertCell(3);
            const priceCell = newRow.insertCell(4);
            const sellerCell = newRow.insertCell(5);


            // Llena las celdas con los datos de la venta, el producto y precio
            orderNumberCell.textContent = venta['numero-de-orden'];
            dateCell.textContent = venta.fecha
            sellerCell.textContent = venta.vendedor;

            // Agrega información del producto a la lista
            venta.productos.forEach(producto => {
                const imagenNombre = imagenesJuegosMap.get(producto.titulo);
                const imagenSrc = `../assets/img/covers/${imagenNombre}`;

                const imgElement = document.createElement('img');
                imgElement.src = imagenSrc;
                imgElement.alt = producto.titulo;
                imgElement.style.maxWidth = '100px'; // Establece el tamaño máximo en píxeles
                imgElement.style.height = 'auto';

                productCell.appendChild(imgElement);

                const productInfo = document.createElement('div');
                productInfo.textContent = `${producto.titulo} x${producto.cantidad}`;
                productCell.appendChild(productInfo);

                if (!isNaN(parseFloat(producto.precio))) {
                    priceCell.textContent = `$${parseFloat(producto.precio).toFixed(2)}`;
                } else {
                    // Intenta corregir y establecer el precio en la celda de precio correspondiente
                    priceCell.textContent = corregirYConvertirPrecio(producto.precio);
                }

            });
        });
    }

    // Función para corregir y convertir el precio en un número válido
    function corregirYConvertirPrecio(precio) {
        // Elimina cualquier caracter que no sea dígito o punto decimal
        const precioCorregido = precio.replace(/[^\d.]/g, '');

        // Intenta convertir el precio corregido a un número
        const precioNumerico = parseFloat(precioCorregido);

        // Si la conversión fue exitosa y obtuviste un número válido, devuélvelo
        if (!isNaN(precioNumerico)) {
            return `$${precioNumerico.toFixed(2)}`;
        } else {
            // Si no se pudo corregir o convertir, puedes devolver un mensaje de "Precio no disponible"
            return 'Precio no disponible';
        }
    }


});
