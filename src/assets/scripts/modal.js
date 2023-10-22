const modalbg = document.querySelector('.modal-bg')
const modalgame = document.querySelector('.modal-game')

modalbg.addEventListener('click', (e) => {
    modalgame.remove()
    modalbg.remove()
})

function crearModalGame() {
    const modalGameContent = `
<div class="modal-bg">
                <div class="modal-game">
                    <div class="div1">
                        <img src="covers/TLOU.jpg" alt="" />
                    </div>

                    <div class="div2">
                        <h2>Título</h2>
                        <p>Animal Crossing: New Horizon</p>
                    </div>
                    <div class="div3">
                        <h2>Calificación</h2>
                        <p>★★★★</p>
                    </div>
                    <div class="div4">
                        <h2>Precio</h2>
                        <p>$59.99</p>
                    </div>
                    <div class="div5">
                        <h2>Plataformas:</h2>
                        <p>Nintendo Switch</p>
                    </div>
                    <div class="div6">
                        <h2>Tags</h2>
                        <span class="tag">Simulación</span><span class="tag">Social</span
                        ><span class="tag">Multijugador</span>
                    </div>
                    <div class="div7">
                        <h2>Descripción</h2>
                        <p>
                            Descripción: Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Quisquam, voluptatum. Quisquam voluptatum,
                            quibusdam, quia, voluptates quod exercitationem quos voluptas
                            quas quibusdam, quia, voluptates
                        </p>
                    </div>
                </div>
            </div>
`

    const main = document.getElementsByClassName('main')
    main.appendChild(modalGameContent)
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtén todos los elementos con la clase 'item-card-btn'
    const botones = document.querySelectorAll('.item-card-btn')

    // Agrega un event listener a cada botón
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            console.log('Hola')
        })
    })
})