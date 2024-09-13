const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  weatherAPIKey: process.env.WEATHER_API_KEY,
  port: process.env.PORT || 5000,
};
