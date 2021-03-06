const fs = require("fs");
const express = require('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en la URL http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Desafio</title>
    </head>
    <body>
        <h1>Desafio de la clase de servidor con express</h1>
        <button onclick="window.location.href='/productos'">Productos</button>
        <button onclick="window.location.href='/productorandom'">Producto random</button>
    </body>
    </html>`)
})

app.get('/productos', (req, res) => {
    async function getAll(){
        try{
            const contenido = await fs.promises.readFile('productos.txt', 'utf-8');
            res.status(200).send(`${contenido}`);
            }
        catch(err){
            console.log('Hubo un error en getAll');
        }
    }
    getAll()
})

app.get('/productoRandom', (req, res) => {
    async function getRandom(){
        try{
            let random = Math.floor(Math.random() * (4 - 1) + 1);
            const contenido = await fs.promises.readFile('productos.txt', 'utf-8');
            let datos = JSON.parse(contenido);
            let responseFilter = datos.filter(elemento => elemento.id==random);
            let responseMap = responseFilter.map(elemento => elemento.title);
            let responseMapPic = responseFilter.map(elemento => elemento.thumbnail);
            let responsePrice = responseFilter.map(elemento => elemento.price);
            console.log(responseMap);
            res.status(200).send(`<h1 style="font-family: arial; margin-left: 200px; margin-top: 50px">${responseMap}</h1> 
            <img src="${responseMapPic}" style="height: 500px ; width: 500px ; margin: 10px; border: 1px solid black"></img> 
            <p style="font-family: arial; margin-left: 200px">Precio: ${responsePrice}</p>`);
            }
        catch(err){
            console.log('Hubo un error en getRandom');
        }
    }
    getRandom()
})

