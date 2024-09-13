const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRotas = require('./routes/authRouter');
const tempoRotas = require('./routes/tempoRouter');
const { conectarRedis } = require('./utils/cache');

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB Atlas:', error);
});

// Conectar ao Redis
conectarRedis();

// Rotas
app.use('/api/auth', authRotas);
app.use('/api/tempo', tempoRotas);

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
