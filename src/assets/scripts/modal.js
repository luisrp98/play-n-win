import { generateStars } from './generarEstrellas.js'

export function createModal(game, modaltype) {
    let modalbg = document.createElement('div')
    modalbg.className = 'modal-bg'
    let modalInnerHTML
    if (modaltype === 'modal-game') {
        modalInnerHTML = `<div class="modal-game"><div class="div1"><img src="${
            game.imagen
        }" alt="${game.titulo}" /></div><div class="div2"><h2>Título</h2><p>${
            game.titulo
        }</p></div><div class="div3"><h2>Calificación</h2><p class='stars-rate'>${generateStars(
            game.estrellas
        )}</p></div><div class="div4"><h2>Precio</h2><p>$${
            game.precio
        }</p></div><div class="div5"><h2>Plataformas:</h2><p>${game.plataforma.join(
            ', '
        )}</p></div><div class="div6"><h2>Tags</h2>${game.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join('')}</div><div class="div7"><h2>Descripción</h2><p>${
            game.descripcion
        }</p></div></div>`
    } else if (modaltype === 'modal-sale') {
        modalInnerHTML = `<div class="modal-sell border-r-1"><div class="modal-form f-display"><form action="" id="add-sale"><legend>Num. de orden</legend><p id="modal-num-order">12849124</p><legend>Producto</legend><select name="" id=""><option disabled selected>Selecciona un producto</option><!-- Aquí se agregan las opciones desde la API --></select><input type="number" name="" id="" /><input type="submit" value="Agregar" class="btn" /><legend>Vendedor</legend><select name="" id=""><option disabled selected>Selecciona un vendedor</option><option value="">Mariana Silva</option><option value="">Luis Romo</option></select><legend>Fecha</legend><input type="date" /></form><div class="cart"><div class="cart-item"><table><thead><th>Título</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></thead><tbody></tbody></table></div></div></div><div class="modal-form-btn"><input type="submit" value="Agregar venta" id="btn-submit" class="btn btn-sell" /><input type="button" value="Cancelar" id="btn-clear" class="btn btn-delete" /></div></div>`
    }

    // Agrega el elemento modal al modalbg
    modalbg.innerHTML = modalInnerHTML

    // Agrega un event listener al modalbg para cerrar el modal al hacer clic fuera
    modalRemove(modalbg)

    const main = document.querySelector('main')
    main.appendChild(modalbg)
}

export function modalRemove(modalbg) {
    modalbg.addEventListener('click', function (event) {
        if (event.target === modalbg) {
            if (modalbg) {
                modalbg.remove()
            }
        }
    })
}
