function resetSearchForm() {
    // Limpia los campos de búsqueda
    document.querySelector('input[type="text"]').value = '';
    document.querySelector('#min-price').value = '';
    document.querySelector('#max-price').value = '';

    // Desmarca todas las casillas de plataforma y estrellas
    const platformCheckboxes = document.querySelectorAll('input[name="plataforma[]"]');
    platformCheckboxes.forEach(checkbox => checkbox.checked = false);

    const starRadios = document.querySelectorAll('input[name="star"]');
    starRadios.forEach(radio => radio.checked = false);

    // Muestra todos los videojuegos
    generateGameCards(videojuegos);
}

// Agregar funcionalidad al botón "Limpiar"
const btnLimpiar = document.getElementById('btn-clear');
btnLimpiar.addEventListener('click', () => {
    clearGameCards(); // Limpia las tarjetas
    resetSearchForm(); // Restablece los campos de búsqueda y muestra todos los videojuegos
});