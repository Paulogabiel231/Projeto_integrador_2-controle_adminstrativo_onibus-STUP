const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/entrar', async (req, res) => {
  const cpf = req.body.cpf;
  const nascimento = req.body.nascimento;

  try {
    const cliente = await prisma.cliente.findFirst({
      where: {
        cpf: cpf,
      },
    });
    console.log(nascimento);
    // Verificar se o usuário existe e a senha está correta
    if (cliente.nascimento.toISOString().split('T')[0] != nascimento) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ clienteId: cliente.id }, 'seuSegredoSuperSecreto', {
      expiresIn: '1h', // Expira em 1 hora, ajuste conforme necessário
    });

    res.json({ token });
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/entrar-adm', async (req, res) => {
  const cpf = req.body.cpf;
  const nascimento = req.body.nascimento;

  try {
    const usuario = await prisma.usuario.findFirst({
      where: {
        cpf: cpf,
      },
    });

    // Verificar se o usuário existe e a senha está correta
    if (usuario.nascimento.toISOString().split('T')[0] != nascimento) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ usuarioId: usuario.id }, 'seuSegredoSuperSecreto', {
      expiresIn: '30m', // Expira em 1 hora, ajuste conforme necessário
    });

    res.json({ token });
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
