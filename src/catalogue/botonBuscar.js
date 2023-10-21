// Cuando se envía el formulario de búsqueda
const searchForm = document.querySelector('form')
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    clearGameCards() // Limpia las tarjetas antes de aplicar los filtros

    // Recolectar los valores de los filtros
    const nameFilter = document.querySelector('input[type="text"]').value.toLowerCase() // Convertir a minúsculas para hacer coincidencia insensible a mayúsculas y minúsculas
    const minPriceFilter = parseFloat(document.querySelector('#min-price').value) || 0
    const maxPriceFilter =
        parseFloat(document.querySelector('#max-price').value) || Infinity


    // Filtrar los juegos que cumplen con los criterios
    try {
        const filteredGames = videojuegos.filter((game) => {
            // Filtro de nombre
            if (nameFilter) {
                const gameName = game.Titulo.toLowerCase()
                if (!gameName.includes(nameFilter)) {
                    console.log(`No coincide: ${gameName} con ${nameFilter}`)
                    return false // No cumple con el filtro de nombre
                }
            }

            //Filtro de plataforma
            const selectedPlatforms = Array.from(
                document.querySelectorAll('input[name="plataforma[]"]:checked')
            ).map((checkbox) => checkbox.value)

            if (selectedPlatforms.length > 0) {
                if (
                    !selectedPlatforms.some((platform) =>
                        game.Plataforma.includes(platform)
                    )
                ) {
                    console.log(
                        `No coincide la plataforma: ${game.Plataforma.join(
                            ', '
                        )} con ${selectedPlatforms}`
                    )
                    return false // No cumple con el filtro de plataforma
                }
            }

            // Filtro de calificación de estrellas
            const selectedStars = Array.from(
                document.querySelectorAll('input[name="star"]:checked')
            ).map(radio => radio.value);

            if (selectedStars.length > 0) {
                console.log(`Calificación de estrellas seleccionada: ${selectedStars.join(', ')}`);
                const gameStars = `${game.Estrellas}-star`;
                if (!selectedStars.includes(gameStars)) {
                    console.log(`No coincide la calificación de estrellas: ${gameStars} con ${selectedStars}`);
                    return false; // No cumple con el filtro de estrellas
                }
            }

            // Filtro de precio mínimo y máximo
            if (game.Precio < minPriceFilter || game.Precio > maxPriceFilter) {
                console.log(
                    `No coincide el precio: ${game.Precio} con rango [${minPriceFilter} - ${maxPriceFilter}]`
                )
                return false
            }


            console.log(`Coincide: ${game.Titulo} con ${nameFilter}`)
            return true
        })


        // Generar tarjetas para los juegos filtradoss
        generateGameCards(filteredGames)
    } catch (error) {
        console.error('Error en el filtro:', error)
    }

})

