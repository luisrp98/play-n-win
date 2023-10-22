// Recuperar el elemento de entrada de texto y el datalist
const inputSearch = document.querySelector('input[type="text"]');
const datalist = document.getElementById('gameNames');

// Variable para almacenar los nombres de los videojuegos
let gameNames = [];

// Función para configurar el autocompletado
function setupAutocomplete(names) {
    inputSearch.addEventListener('input', (event) => {
        const inputText = event.target.value.toLowerCase();
        const matchingNames = names.filter((name) => name.includes(inputText));
        // Limpiar y rellenar el datalist con las opciones coincidentes
        while (datalist.firstChild) {
            datalist.removeChild(datalist.firstChild);
        }
        matchingNames.forEach((name) => {
            const option = document.createElement('option');
            option.value = name;
            datalist.appendChild(option);
        });
    });
}

// Cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Configurar el autocompletado una vez que se cargue el DOM
    loadVideojuegosData()
        .then((data) => {
            videojuegos = data.videojuegos; // Asignar los datos a la variable

            // Extraer los nombres de los videojuegos
            gameNames = videojuegos.map((game) => game.Titulo.toLowerCase());

            // Configurar el autocompletado una vez que se tengan los nombres
            setupAutocomplete(gameNames);
        })
        .catch((error) => {
            console.error('Error al cargar datos:', error);
        });
});
