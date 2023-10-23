import { generateStars } from './generarEstrellas.js'
import { crearModalGame } from './modal.js'

const apiURL = 'https://6534761be1b6f4c59046be6a.mockapi.io/api/games/videojuegos'

// Función para generar las tarjetas de juego
export function generateGameCards(videojuegos) {
    const container = document.getElementById('new-item-section')

    videojuegos.forEach((game) => {
        const card = document.createElement('div')
        card.classList.add('new-item-card')

        // Crear la imagen
        const image = document.createElement('img')
        image.classList.add('cover')
        image.src = game.imagen
        image.alt = game.titulo

        // Crea div inline
        const inline = document.createElement('div')
        inline.classList.add('inline')

        // Creación de elementos dentro de div inline
        const title = document.createElement('h3')
        title.classList.add('title')
        title.textContent = game.titulo

        // Precio
        const price = document.createElement('p')
        price.classList.add('price')
        price.textContent = `$${game.precio}`

        // Agregar elementos al div inline
        inline.appendChild(title)
        inline.appendChild(price)

        // Calificación (Estrellas)
        const rate = document.createElement('p')
        rate.classList.add('rate')
        rate.textContent = generateStars(game.estrellas)

        // Agregar elementos al div inline
        inline.appendChild(title)
        inline.appendChild(price)
        inline.appendChild(rate)

        // Crear la información de la plataforma
        const platform = document.createElement('p')
        platform.classList.add('item-card-plataform')
        platform.textContent = `Plataformas: ${game.plataforma.join(', ')}`

        //MODAL
        const button = document.createElement('button')
        button.classList.add('item-card-btn')
        button.onclick = function () {
            crearModalGame(game);
        }
        button.textContent = 'Ver más'

        // Agregar elementos al card
        card.appendChild(image)
        card.appendChild(inline)
        card.appendChild(platform)
        card.appendChild(button)

        // Agregar el card al contenedor
        container.appendChild(card)
    })
}

// Función para cargar datos desde la API
async function loadVideojuegosData() {
    try {
        const response = await fetch(apiURL)
        if (!response.ok) {
            throw new Error('No se pudo cargar la API de videojuegos.')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Define la variable videojuegos en un alcance más amplio
let videojuegos

// Cargar los datos y generar tarjetas iniciales
loadVideojuegosData()
    .then((data) => {
        videojuegos = data
        generateGameCards(videojuegos)
    })
    .catch((error) => {
        console.error('Error al cargar datos:', error)
    })
