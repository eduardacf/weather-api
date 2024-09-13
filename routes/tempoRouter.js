const express = require('express');
const { obterTempo } = require('../controllers/tempoController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarCache = require('../middlewares/cacheMiddleware');

const router = express.Router();

// Rota para obter previsão do tempo
router.get('/', verificarToken, verificarCache, obterTempo);

module.exports = router;
