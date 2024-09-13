const axios = require('axios');
const Tempo = require('../models/tempoModel');
const { cachearDadosTempo, obterDadosTempoCacheados } = require('../utils/cache');

const obterTempo = async (req, res) => {
  const { cidade } = req.query;

  // Verificar cache
  const dadosCacheados = await obterDadosTempoCacheados(cidade);
  if (dadosCacheados) {
    return res.status(200).json(dadosCacheados);
  }

  try {
    const resposta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.WEATHER_API_KEY}`);
    const dadosTempo = resposta.data;

    // Salvar no cache
    cachearDadosTempo(cidade, dadosTempo);

    // Salvar no banco de dados
    const novoTempo = new Tempo({ cidade, dados: dadosTempo });
    await novoTempo.save();

    res.status(200).json(dadosTempo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar dados do tempo' });
  }
};

module.exports = { obterTempo };
