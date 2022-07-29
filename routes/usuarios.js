const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarios-controller');

router.post('/cadastro', UsuariosController.cadastro);
router.post('/login', UsuariosController.login);

module.exports = router;