const redis = require('redis');
const cliente = redis.createClient();

// Middleware de cache
const verificarCache = (req, res, next) => {
  const { cidade } = req.query;

  cliente.get(cidade, (err, dados) => {
    if (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao verificar o cache.' });
    }

    if (dados) {
      res.status(200).json(JSON.parse(dados));
    } else {
      next();
    }
  });
};

module.exports = verificarCache;
