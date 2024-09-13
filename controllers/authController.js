const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

// Registrar novo usuário
const registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Usuário já existe' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Criar novo usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
    });

    await novoUsuario.save();

    // Gerar token JWT
    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário' });
  }
};

// Login de usuário
const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};

// Recuperar senha
const recuperarSenha = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }

    // Gerar nova senha temporária
    const novaSenha = Math.random().toString(36).slice(-8);

    // Criptografar a nova senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(novaSenha, salt);

    // Atualizar a senha do usuário
    usuario.senha = senhaCriptografada;
    await usuario.save();

    // Enviar nova senha por email (simulação)
    console.log(`Nova senha para ${email}: ${novaSenha}`);

    res.status(200).json({ mensagem: 'Nova senha enviada para o email' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao recuperar senha' });
  }
};

module.exports = { registrarUsuario, loginUsuario, recuperarSenha };