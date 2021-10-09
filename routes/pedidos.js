const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        connection.query(
            `SELECT pedidos.id_pedidos, 
                    pedidos.quantidade, 
                    produtos.id_produto, 
                    produtos.nome, 
                    produtos.preco 
               FROM pedidos 
         INNER JOIN produtos 
                 ON produtos.id_produto = pedidos.id_pedidos;`,
            (error, result, field) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                const response = {
                    pedidos: result.map(pedido => {
                        return {
                            id_pedidos: pedido.id_pedidos,
                            quantidade: pedido.quantidade,
                            produto: {
                                id_produto: pedido.id_produto,
                                nome: pedido.nome,
                                preco: pedido.preco
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um pedido especifico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedidos
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
});


// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, connection) => {

        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'SELECT * FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, result, fields) => {

                if (error) {
                    return res.status(500).send({ error: error })
                }
                
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado'
                    })
                }

                connection.query(
                    'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
                    [req.body.id_produto, req.body.quantidade],
                    (error, result, field) => {
                        connection.release();
        
                        if (error) {
                            return res.status(500).send({ error: error })
                        }
        
                        if (result.length == 0) {
                            return res.status(404).send({
                                mensagem: 'Não foi encontrado pedido com este ID'
                            })
                        }
        
                        const response = {
                            mensagem: 'Pedido inserido com sucesso',
                            pedidoCriado: {
                                id_pedidos: result.id_pedidos,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os pedidos',
                                    url: 'http://localhost:3000/pedidos'
                                }
                            }
                        }
                        return res.status(201).send(response);
                    }
                )
            }
        )
    })
});

// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedidos', (req, res, next) => {
    mysql.getConnection((error, connection) => {

        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'SELECT * FROM pedidos WHERE id_pedidos = ?;',
            [req.params.id_pedidos],
            (error, result, field) => {

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado pedido com este ID'
                    })
                }

                const response = {
                    pedido: {
                        id_pedidos: result[0].id_pedidos,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, connection) => {

        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            `DELETE FROM pedidos WHERE id_pedidos = ?`,
            [req.body.id_pedidos],
            (error, resultado, field) => {
                connection.release()

                if (error) {
                    return res.status(500).send({ error: error })
                }

                const response = {
                    mensagem: 'Pedido removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        url: 'http://localhost/3000/pedidos',
                        body: {
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
})

module.exports = router;