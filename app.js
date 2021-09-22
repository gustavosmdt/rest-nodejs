const express = require('express');
const app =  express();
const morgan = require('morgan');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false})) // apenas seta dados simples
app.use(express.json()); // só aceita json de entrada no body

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*')
    res.header('Acces-Control-Allow-Header', 'Origin', 'X-Requrested-With', 'Content-Type', 'Accept', 'Authorization');

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET')
        return res.status(200).send({});
    }
    next();
})

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);


// Quando não encontra a rota, entra aqui:
app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;