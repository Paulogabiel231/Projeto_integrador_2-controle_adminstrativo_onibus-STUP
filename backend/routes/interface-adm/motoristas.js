var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const upload = require("../../middlewares/fileUpload");
const prisma = new PrismaClient();

router.post("/cadastrar", upload.single("foto"), async (req, res, next) => {
  try {

    const nome = req.body.nome;
    const rg = req.body.rg;
    const cnh = req.body.cnh;
    const cpf = req.body.cpf;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const foto = req.file?.path;
    const nascimento = req.body.nascimento ? new Date(req.body.nascimento).toISOString() : null;
    const data = { nome, rg, cnh, cpf, nascimento, telefone, email, sexo, foto };
    console.log(data);
    const motorista = await prisma.motorista.create({ data });
    res.json(motorista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a motorista." });
  }
});

router.get("/listar", async function (req, res, next) {
  const motorista = await prisma.motorista.findMany({
    orderBy: {
      id: 'desc', // Isso ordenará pelos IDs de forma decrescente, você pode usar outro campo de data se preferir
    },
  });
  res.json(motorista);
});

router.get("/visualizar/:id", async function (req, res, next) {
  const motoristaId = parseInt(req.params.id);

  try {
    const motorista = await prisma.motorista.findUnique({
      where: {
        id: motoristaId,
      },
    });

    if (motorista) {
      res.json(motorista);
    } else {
      res.status(404).json({ error: 'Motorista não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar Motorista por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get("/editar/:id", async function (req, res, next) {
  const motoristaId = parseInt(req.params.id);
  try {
    const motorista = await prisma.motorista.findUnique({
      where: {
        id: motoristaId,
      },
    });

    if (motorista) {
      res.json(motorista);
    } else {
      res.status(404).json({ error: 'Motorista não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar Motorista por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/editar/:id', async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, rg, cnh, nascimento, sexo, email, telefone } = req.body;

    const motoristaAtualizada = await prisma.motorista.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        cnh: cnh,
        cpf: cpf,
        rg: rg,
        nascimento: new Date(nascimento),
        sexo: sexo,
        email: email,
        telefone: telefone,
      },
    });

    res.json(motoristaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a motorista.' });
  }
});

router.delete("/excluir/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const motoristaExcluida = await prisma.motorista.delete({
      where: {
        id: id,
      },
    });

    if (motoristaExcluida) {
      res.json({ message: "Motorista excluído com sucesso." });
    } else {
      res.status(404).json({ error: "motorista não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o motorista." });
  }
});

router.get("/buscar/:id", async function (req, res, next) {
  const motoristaId = parseInt(req.params.id);

  try {
    const motorista = await prisma.motorista.findUnique({
      where: {
        id: motoristaId,
      },
    });

    if (motorista) {
      res.json(motorista);
    } else {
      res.status(404).json({ error: "motorista não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar motorista por ID:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
