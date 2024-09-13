const axios = require('axios');

// Função para obter dados de previsão do tempo da API de terceiros
const obterDadosTempo = async (cidade) => {
  try {
    const resposta = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: cidade,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric', // Unidade de medida (métrico para Celsius)
        lang: 'pt', // Idioma da resposta
      },
    });

    return resposta.data;
  } catch (error) {
    console.error('Erro ao obter dados de previsão do tempo:', error);
    throw error;
  }
};

module.exports = { obterDadosTempo };
