const apiURL = 'https://6534761be1b6f4c59046be6a.mockapi.io/api/games/videojuegos';

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input[type="text"]');
    const datalist = document.querySelector('#gameNames');

    // Realiza una solicitud a la API para obtener los datos
    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            // Extrae los títulos de los juegos de los datos
            const titles = data.map((game) => game.titulo);

            // Llena el datalist con los títulos de los juegos
            titles.forEach((title) => {
                const option = document.createElement('option');
                option.value = title;
                datalist.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error al cargar los datos de la API:', error);
        });

    input.addEventListener('input', () => {
        const valor = input.value.toLowerCase();

        const options = datalist.querySelectorAll('option');
        options.forEach((option) => {
            if (option.value.toLowerCase().includes(valor)) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    });
});
