import { generateGameCards } from './generarTarjetas.js';

const apiURL = 'https://6534761be1b6f4c59046be6a.mockapi.io/api/games/videojuegos';

document.addEventListener('DOMContentLoaded', () => {
    // Limpia las tarjetas antes de aplicar los filtros
    function clearGameCards() {
        const container = document.getElementById('new-item-section');
        container.innerHTML = '';
    }

    // Define la variable videojuegos en un alcance más amplio
    let videojuegos;

    // Función para cargar datos desde la API
    async function loadVideojuegosData() {
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('No se pudo cargar la API de videojuegos.'); // Corrección: "throw new Error" en lugar de "throw an Error"
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Cargar los datos, pero no generar tarjetas iniciales
    loadVideojuegosData()
        .then((data) => {
            videojuegos = data;
        })
        .catch((error) => {
            console.error('Error al cargar datos:', error);
        });

    // Cuando se envía el formulario de búsqueda
    const searchForm = document.querySelector('form');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!videojuegos) {
            console.error('No se han cargado los datos de videojuegos.');
            return;
        }

        // Recolectar el valor del filtro de título
        const titleFilter = document.querySelector('input[type="text"]').value.toLowerCase();
        // Recolectar las plataformas seleccionadas
        const selectedPlatforms = Array.from(document.querySelectorAll('input[name="plataforma[]"]:checked')).map((checkbox) => checkbox.value);
        // Recolectar los valores de filtro de precio mínimo y máximo
        const minPriceFilter = parseFloat(document.querySelector('#min-price').value) || 0;
        const maxPriceFilter = parseFloat(document.querySelector('#max-price').value) || Infinity;
        // Recolectar las calificaciones de estrellas seleccionadas
        const selectedStars = Array.from(document.querySelectorAll('input[name="star"]:checked')).map(radio => radio.value);

        // Filtrar los juegos que cumplen con el criterio de título
        try {
            const filteredGames = videojuegos.filter((game) => {
                // Filtro de título
                if (titleFilter) {
                    const gameTitle = game.titulo.toLowerCase();
                    console.log('Búsqueda de título:', titleFilter); // Agregado para verificar
                    if (!gameTitle.includes(titleFilter)) {
                        return false; // No cumple con el filtro de título
                    }
                }

                // Filtro de plataforma
                if (selectedPlatforms.length > 0 && !selectedPlatforms.every((platform) => game.plataforma.includes(platform))) {
                    return false; // No cumple con el filtro de plataforma
                }

                // Filtro de precio mínimo y máximo
                if (game.precio < minPriceFilter || game.precio > maxPriceFilter) {
                    return false; // No cumple con el filtro de precio
                }

                // Filtro de calificación de estrellas
                const gameStars = `${game.estrellas}-star`;
                if (selectedStars.length > 0 && !selectedStars.includes(gameStars)) {
                    return false; // No cumple con el filtro de estrellas
                }

                return true; // El juego cumple con el filtro
            });

            // Limpiar las tarjetas antes de mostrar las nuevas tarjetas
            clearGameCards();

            // Generar tarjetas para los juegos filtrados
            generateGameCards(filteredGames);
        } catch (error) {
            console.error('Error en el filtro:', error);
        }
    });
});
