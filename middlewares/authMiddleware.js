const jwt = require('jsonwebtoken');

// Middleware de autenticação
const verificarToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Verificar se o token existe
  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).json({ mensagem: 'Token inválido.' });
  }
};

module.exports = verificarToken;
