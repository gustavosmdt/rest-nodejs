const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const produtosController = require('../controllers/produtos-controller')

router.get('/', produtosController.getProdutos);
router.post('/', produtosController.postProdutos);
router.get('/:id_produto', produtosController.getUmProduto);
router.patch('/', login.required, produtosController.patchProduto);
router.delete('/', login.required, produtosController.deleteProduto)

module.exports = router;