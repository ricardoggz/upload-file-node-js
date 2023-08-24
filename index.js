const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const app = express();
const port = 3001;

// Habilitar express-fileupload
app.use(fileUpload());
app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')))
// Ruta para manejar la carga de la imagen
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No se encontraron archivos para cargar.');
  }

  const image = req.files.image;

  // Mover la imagen a la carpeta de destino
  image.mv(__dirname + '/files/' + image.name, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('Imagen cargada exitosamente');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
