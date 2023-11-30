var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const upload = require("../../middlewares/fileUpload");
const prisma = new PrismaClient();

router.get("/listar", async function (req, res, next) {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

router.get("/buscar/:id", async function (req, res, next) {
  const usuarioId = parseInt(req.params.id); 

  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'usuario não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuario por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post("/cadastrar", upload.single("foto"), async (req, res, next) => {
  try {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const rg = req.body.rg;
    const nascimento = req.body.nascimento ? new Date(req.body.nascimento).toISOString() : null;
    const telefone = req.body.telefone;
    const sexo = req.body.sexo;
    const foto = req.file?.path;
    console.log(req.body);
    const data = { nome, email, senha, foto, cpf, rg, nascimento, telefone, sexo};
    console.log(data);;
    const usuario = await prisma.usuario.create({ data });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o usuario." });
  }
});

router.put('/editar/:id', async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, senha, token} = req.body;
    
    const usuarioAtualizada = await prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        email: email,
        senha: senha,
        token: token
      },
    });

    res.json(usuarioAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o usuario.' });
  }
});

router.delete("/excluir/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const usuarioExcluida = await prisma.usuario.delete({
      where: {
        id: id,
      },
    });

    if (usuarioExcluida) {
      res.json({ message: "usuario excluído com sucesso." });
    } else {
      res.status(404).json({ error: "usuario não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o usuario." });
  }
});

module.exports = router;
