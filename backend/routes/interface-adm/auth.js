const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/entrar", async function (req, res, next) {
  const { email, senha } = req.body;

  try {
    const user = await prisma.usuario.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(401).json({ mensagem: "E-mail não encontrado." });
    }

    const passwordIsValid = await bcrypt.compare(senha, user.senha);
    if (!passwordIsValid) {
      return res.status(401).json({ mensagem: "Senha inválida." });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });

    res.status(200).json({ mensagem: "Login realizado com sucesso.", token: token });
  } catch (error) {
    console.error('Ocorreu um erro ao realizar o login: ', error);

    res.status(500).json({ mensagem: "Não foi possível realizar o login do usuário." });
  }
});

module.exports = router;
