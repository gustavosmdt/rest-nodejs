const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        let numSalt = 10
        bcrypt.hash(req.body.senha, numSalt, (errorBcrypt, hash) => {
            if (errorBcrypt) {
                console.log(errorBcrypt)
                return res.status(500).send({ error: errorBcrypt })
            }
            connection.query(
                `INSERT INTO usuarios (email, senha) VALUES (?,?)`,
                [req.body.email, hash],
                (error, result) => {
                    connection.release();
                    if (error) {
                        return res.status(500).send({ error: error })
                    }
                    response = {
                        mensagem: 'Usuário criado com sucesso',
                        usuarioCriado: {
                            id_usuario: result.insertId,
                            email: req.body.email
                        }
                    }
                    return res.status(201).send(response);
                }
            )
        }) 
    });
})

module.exports = router;

