import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Sirve los archivos estáticos de la aplicación Vue.js construida
app.use(express.static(path.join(__dirname, 'dist')))

// Para cualquier otra solicitud (todas las rutas de la SPA),
// devuelve el archivo 'index.html' de tu aplicación Vue.js
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Cloud Run asigna un puerto a través de la variable de entorno PORT
const port = process.env.PORT || 8080 // eslint-disable-line no-undef
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
