var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const upload = require("../../middlewares/fileUpload");
const prisma = new PrismaClient();

router.post("/cadastrar", upload.single("foto"), async (req, res, next) => {
  try {
    const nome = req.body.nome;
    const foto = req.file?.path;
    console.log(req.body);
    const data = { nome, foto };
    console.log(data);
    console.log(req.file);
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

router.get("/exibir/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const motorista = await prisma.motorista.findUnique({
      where: { id: parseInt(id) }
    });

    if (!motorista) {
      return res.status(404).json({ mensagem: "Motorista não encontrado." });
    }

    res.json(motorista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao obter o motorista por ID." });
  }
});

router.put("/editar/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, foto } = req.body;

    const motoristaAtualizada = await prisma.motorista.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        foto: foto,
      },
    });

    res.json(motoristaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a motorista." });
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
      res.json({ message: "motorista excluído com sucesso." });
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
