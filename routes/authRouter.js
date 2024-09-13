const express = require('express');
const { registrarUsuario, loginUsuario, recuperarSenha } = require('../controllers/authController');

const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);
router.post('/recuperar-senha', recuperarSenha);

module.exports = router;