import { generateStars } from './generarEstrellas.js';


export function crearModalGame(game) {
    let modalbg = document.createElement('div');
    modalbg.className = 'modal-bg';
    let modalGameContent = `
        <div class="modal-game">
            <div class="div1">
                <img src="${game.imagen}" alt="${game.titulo}" />
            </div>
            <div class="div2">
                <h2>Título</h2>
                <p>${game.titulo}</p>
            </div>
            <div class="div3">
                <h2>Calificación</h2>
                <p>${generateStars(game.estrellas)}</p>
            </div>
            <div class="div4">
                <h2>Precio</h2>
                <p>$${game.precio}</p>
            </div>
            <div class="div5">
                <h2>Plataformas:</h2>
                <p>${game.plataforma.join(', ')}</p>
            </div>
            <div class="div6">
                <h2>Tags</h2>
                ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="div7">
                <h2>Descripción</h2>
                <p>${game.descripcion}</p>
            </div>
        </div>
    `;
    modalbg.innerHTML = modalGameContent;

    // Agrega un event listener al modalbg para cerrar el modal al hacer clic fuera
    modalbg.addEventListener('click', function (event) {
        if (event.target === modalbg) {
            modalRemove();
        }
    });

    const main = document.querySelector('main');
    main.appendChild(modalbg);
}

export function modalRemove() {
    const modalbg = document.querySelector('.modal-bg');
    if (modalbg) {
        modalbg.remove();
    }
}