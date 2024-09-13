const redis = require('redis');
const cliente = redis.createClient();

const conectarRedis = () => {
  cliente.on('connect', () => {
    console.log('Conectado ao Redis');
  });
};

const cachearDadosTempo = (cidade, dados) => {
  cliente.setex(cidade, 3600, JSON.stringify(dados)); // Cache por 1 hora
};

const obterDadosTempoCacheados = (cidade) => {
  return new Promise((resolver, rejeitar) => {
    cliente.get(cidade, (err, dados) => {
      if (err) rejeitar(err);
      if (dados) resolver(JSON.parse(dados));
      else resolver(null);
    });
  });
};

module.exports = { conectarRedis, cachearDadosTempo, obterDadosTempoCacheados };