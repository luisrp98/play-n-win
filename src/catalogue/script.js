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
        image.src = game.Imagen; // Asegúrate de que la propiedad Imagen coincida con la estructura de tu JSON
        image.alt = game.Titulo; // Asegúrate de que la propiedad Titulo coincida con la estructura de tu JSON

        // Crear el título
        const title = document.createElement('h2');
        title.classList.add('item-card-title');
        title.textContent = game.Titulo; // Asegúrate de que la propiedad Titulo coincida con la estructura de tu JSON

        // Crear el precio
        const price = document.createElement('p');
        price.classList.add('item-card-price');
        price.textContent = `${game.Precio}$`; // Asegúrate de que la propiedad Precio coincida con la estructura de tu JSON

        // Crear la información de la plataforma
        const platform = document.createElement('p');
        platform.classList.add('item-card-plataform');
        platform.textContent = `Plataformas: ${game.Plataforma.join(', ')}`; // Asegúrate de que la propiedad Plataforma coincida con la estructura de tu JSON

        // Crear la descripción
        const description = document.createElement('p');
        description.classList.add('item-card-desc');
        description.textContent = `Descripción: ${game.Descripcion}`; // Asegúrate de que la propiedad Descripcion coincida con la estructura de tu JSON

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

// Llama a la función para cargar los datos y generar las tarjetas de juego
loadVideojuegosData()
    .then(data => {
        generateGameCards(data.videojuegos);
    });




// Llama a la función para cargar los datos y trabajar con ellos
loadVideojuegosData()
    .then(data => {
        generateGameCards(data.videojuegos);
    });

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

            // Agregar más filtros...

            console.log(`Coincide: ${game.Titulo} con ${nameFilter}`);
            return true;
        });

        // Generar tarjetas para los juegos filtrados
        generateGameCards(filteredGames);
    } catch (error) {
        console.error("Error en el filtro:", error);
    }
});

