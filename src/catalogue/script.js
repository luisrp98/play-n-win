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
      image.src = game.Imagen; 
      image.alt = game.Titulo; 
      
      // Crear el título
      const title = document.createElement('h2');
      title.classList.add('item-card-title');
      title.textContent = game.Titulo; 
      
      // Crear el precio
      const price = document.createElement('p');
      price.classList.add('item-card-price');
      price.textContent = `${game.Precio}$`; 
      
      // Crear la información de la plataforma
      const platform = document.createElement('p');
      platform.classList.add('item-card-plataform');
      platform.textContent = `Plataformas: ${game.Plataforma.join(', ')}`; 
      
      // Crear la descripción
      const description = document.createElement('p');
      description.classList.add('item-card-desc');
      description.textContent = `Descripción: ${game.Descripcion}`; 
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

// Llama a la función para cargar los datos y trabajar con ellos
loadVideojuegosData()
  .then(data => {
    generateGameCards(data.videojuegos);
  });
