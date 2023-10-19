// Ruta para cargar el archivo JSON
const jsonFilePath = '../catalogue/videojuegos.json';

// Función para cargar datos desde el archivo JSON
async function loadVideojuegosData() {
    try {
        const response = await fetch(jsonFilePath);
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Función para generar las tarjetas de juego
function generateGameCards(videojuegos) {
    const container = document.getElementById('items-section');

    videojuegos.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('item-card');

        // Crear la imagen
        const image = document.createElement('img');
        image.src = game.Imagen;
        image.alt = game.Titulo;


        // Crear el título
        const title = document.createElement('h2');
        title.classList.add('item-card-title');

        title.textContent = game.Titulo;
        // Crear el precio
        const price = document.createElement('p');
        price.classList.add('item-card-price');
        price.textContent = `${game.Precio}$`;

        // Crear la información de la plataforma
        const platform = document.createElement('p');
        platform.classList.add('item-card-plataform');
        platform.textContent = `Plataformas: ${game.Plataforma.join(', ')}`;



        // Crear la descripción
        const description = document.createElement('p');
        description.classList.add('item-card-desc');
        description.textContent = `Descripción: ${game.Descripcion}`;


        // Agregar elementos al card
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(platform);
        card.appendChild(description);

        // Agregar el card al contenedor
        container.appendChild(card);
    });
}


function clearGameCards() {
    const container = document.getElementById('items-section');

    // Eliminar todos los elementos dentro de la sección de tarjetas
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Define la variable videojuegos en un alcance más amplio
let videojuegos;

// Cargar los datos y generar tarjetas iniciales
loadVideojuegosData()
    .then(data => {
        videojuegos = data.videojuegos; // Asignar los datos a la variable

        generateGameCards(videojuegos); // Generar tarjetas iniciales
    })
    .catch(error => {
        console.error("Error al cargar datos:", error);
    });

// Cuando se envía el formulario de búsqueda
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    clearGameCards(); // Limpia las tarjetas antes de aplicar los filtros

    // Recolectar los valores de los filtros
    const nameFilter = document.querySelector('input[type="text"]').value.toLowerCase(); // Convertir a minúsculas para hacer coincidencia insensible a mayúsculas y minúsculas
    const minPriceFilter = parseFloat(document.querySelector('#min-price').value) || 0;
    const maxPriceFilter = parseFloat(document.querySelector('#max-price').value) || Infinity;


    // Filtrar los juegos que cumplen con los criterios
    try {
        const filteredGames = videojuegos.filter(game => {
            // Filtro de nombre
            if (nameFilter) {
                const gameName = game.Titulo.toLowerCase();
                if (!gameName.includes(nameFilter)) {
                    console.log(`No coincide: ${gameName} con ${nameFilter}`);
                    return false; // No cumple con el filtro de nombre
                }
            }

            //Filtro de plataforma
            const selectedPlatforms = Array.from(
                document.querySelectorAll('input[name="plataforma[]"]:checked')
            ).map(checkbox => checkbox.value);

            if (selectedPlatforms.length > 0) {
                if (!selectedPlatforms.some(platform => game.Plataforma.includes(platform))) {
                    console.log(`No coincide la plataforma: ${game.Plataforma.join(', ')} con ${selectedPlatforms}`);
                    return false; // No cumple con el filtro de plataforma
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
                console.log(`No coincide el precio: ${game.Precio} con rango [${minPriceFilter} - ${maxPriceFilter}]`);
                return false;
            }

            console.log(`Coincide: ${game.Titulo} con ${nameFilter}`);
            return true;

        });

        // Generar tarjetas para los juegos filtradoss
        generateGameCards(filteredGames);
    } catch (error) {
        console.error("Error en el filtro:", error);
    }
});
