var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const upload = require("../../middlewares/fileUpload");
const prisma = new PrismaClient();

router.get("/listar", async function (req, res, next) {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      id: 'desc', // Isso ordenará pelos IDs de forma decrescente, você pode usar outro campo de data se preferir
    },
  });
  res.json(usuarios);
});

router.get("/visualizar/:id", async function (req, res, next) {
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

router.get("/editar/:id", async function (req, res, next) {
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
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar Usuário por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/editar/:id', async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, rg, nascimento, sexo, email, telefone, senha } = req.body;

    // Crie um objeto com os campos que serão atualizados
    const dadosAtualizacao = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      sexo: sexo,
      email: email,
      telefone: telefone,
      senha: senha,
   
    };
    // Adicione o campo 'nascimento' ao objeto de atualização se estiver presente
    if (nascimento) {
      dadosAtualizacao.nascimento = new Date(nascimento);
    }
    const usuarioAtualizada = await prisma.usuario.update({
      where: {
        id: id,
      },
      data: dadosAtualizacao,
    });
    res.json(usuarioAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o usuario.' });
  }
});



module.exports = router;
