const express = require('express');
const router = express.Router();


// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornando todos os pedidos'
    });
});


// INSERE UM UNICO PEDIDOS
router.post('/', (req, res, next) => {
    res.status(201).send({
        mesagem: 'O pedido foi inserido ou criado'
    });
});


// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        mensagem: 'Detalhes do pedido',
        id: id
    });
});


// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Pedido excluido'
    })
})

module.exports = router;