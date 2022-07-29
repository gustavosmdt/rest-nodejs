const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos-controller');

router.get('/', PedidosController.getPedidos);
router.post('/', PedidosController.addPedido);
router.get('/:id_pedidos', PedidosController.getPedido);
router.delete('/',PedidosController.deletePedido);

module.exports = router;