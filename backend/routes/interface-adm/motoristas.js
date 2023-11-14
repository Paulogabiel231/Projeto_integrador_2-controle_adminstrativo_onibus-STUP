var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const upload = require("../../middlewares/fileUpload");

const prisma = new PrismaClient();

router.get("/listar", async function (req, res, next) {
  const motoristas = await prisma.motorista.findMany();
  res.json(motoristas);
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

module.exports = router;
