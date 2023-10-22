// Cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Obtén referencias a los elementos de los filtros
    const titleFilter = document.querySelector('input[type="text"]');
    const platformCheckboxes = document.querySelectorAll('input[name="plataforma[]"]');
    const minPriceFilter = document.querySelector('#min-price');
    const maxPriceFilter = document.querySelector('#max-price');
    const starRadios = document.querySelectorAll('input[name="star"]');

    // Obtén una referencia al botón de limpiar
    const clearButton = document.querySelector('#btn-clear'); // Cambia el ID al utilizado en tu HTML

    // Agrega un manejador de eventos al botón de limpiar
    clearButton.addEventListener('click', () => {
        // Restablece el filtro de título
        titleFilter.value = '';

        // Desmarca todas las casillas de verificación de plataforma
        platformCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Restablece los valores de filtro de precio mínimo y máximo
        minPriceFilter.value = '';
        maxPriceFilter.value = '';

        // Desmarca todas las casillas de radio de estrellas
        starRadios.forEach((radio) => {
            radio.checked = false;
        });

        // Dispara el evento 'change' en el filtro de título para que se actualicen las tarjetas
        const event = new Event('change', {
            bubbles: true,
            cancelable: true,
        });
        titleFilter.dispatchEvent(event);

        // También puedes disparar el evento 'submit' en el formulario de búsqueda si es necesario
        const searchForm = document.querySelector('form');
        searchForm.dispatchEvent(new Event('submit'));
    });
});
