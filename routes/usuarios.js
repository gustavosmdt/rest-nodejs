const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [req.body.email],
            (error, results) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (results.length > 0) {
                    res.status(401).send({ mensagem: "Usuário já cadastrado"})
                } else {
                    let numSalt = 10
                    bcrypt.hash(req.body.senha.toString(), numSalt, (errorBcrypt, hash) => {
                        if (errorBcrypt) {
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

                }
            }
        )
    });
});

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
 
        connection.query(
            `SELECT * FROM usuarios WHERE email = ?`,
            [req.body.email],
            (error, results, fields) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (results.length < 1) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
                }

                bcrypt.compare(req.body.senha.toString(), results[0].senha, (error, result) => {
                    if (error) {
                        return res.status(401).send({ mensagem: 'Falha na autenticação' })
                    }

                    if (result) {
                        const token = jwt.sign({
                            id_usuario: results[0].id_usuario,
                            email: results[0].email
                        },
                        `${process.env.JWT_KEY}`,
                        {
                            expiresIn: '1h' 
                        });
                        return res.status(200).send({
                            mensagem: 'Autenticado com sucesso',
                            token: token
                        })
                    }

                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
                })
        })
    }) 
})

module.exports = router;