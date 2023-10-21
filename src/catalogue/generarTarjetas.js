// Ruta para cargar el archivo JSON
const jsonFilePath = '../catalogue/videojuegos.json'

// Función para cargar datos desde el archivo JSON
async function loadVideojuegosData() {
    try {
        const response = await fetch(jsonFilePath)
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON.')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Función para generar las tarjetas de juego
function generateGameCards(videojuegos) {
    const container = document.getElementById('new-item-section')

    videojuegos.forEach((game) => {
        const card = document.createElement('div')
        card.classList.add('new-item-card')

        // Crear la imagen
        const image = document.createElement('img')
        image.classList.add('cover')
        image.src = game.Imagen
        image.alt = game.Titulo

        // Crea div inline
        const inline = document.createElement('div')
        inline.classList.add('inline')
        // Creación de elementos dentro de div inline
        // Titulo
        const title = document.createElement('h3')
        title.classList.add('title')
        title.textContent = game.Titulo
        // Precio
        const price = document.createElement('p')
        price.classList.add('price')
        price.textContent = `${game.Precio}$`

        // Agregar elementos al div inline
        inline.appendChild(title)
        inline.appendChild(price)

        const rate = document.createElement('p')
        rate.classList.add('rate')
        // Aquí ira una función para generar las estrellas
        rate.textContent = '★ ★ ★ ★ ★' // Cambiar esto a dinamico

        // Crear la información de la plataforma
        const platform = document.createElement('p')
        platform.classList.add('item-card-plataform')
        platform.textContent = `Plataformas: ${game.Plataforma.join(', ')}`

        const button = document.createElement('button')
        button.textContent = 'Ver más'

        // Agregar elementos al card
        card.appendChild(image)
        card.appendChild(inline)
        card.appendChild(rate)
        card.appendChild(platform)
        card.appendChild(button)

        // Agregar el card al contenedor
        container.appendChild(card)
    })
}

function clearGameCards() {
    const container = document.getElementById('new-item-section')

    // Eliminar todos los elementos dentro de la sección de tarjetas
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

// Define la variable videojuegos en un alcance más amplio
let videojuegos

// Cargar los datos y generar tarjetas iniciales
loadVideojuegosData()
    .then((data) => {
        videojuegos = data.videojuegos // Asignar los datos a la variable

        generateGameCards(videojuegos) // Generar tarjetas iniciales
    })
    .catch((error) => {
        console.error('Error al cargar datos:', error)
    })
