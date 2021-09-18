const express = require("express");
const app = express();

const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt')

const PORT = process.env.PORT || 8080

app.get('/productos', async (req, res) => {
  const prod = await contenedor.getAll();
  res.json(prod)
})

app.get('/producto-random', async (req, res) => {
  const prod = await contenedor.getAll();
  const rand = Math.floor(Math.random() * prod.length)
  res.json(prod[rand]);
})
app.listen(8080, () => {
  console.log('Runing on PORT ' + PORT)
})