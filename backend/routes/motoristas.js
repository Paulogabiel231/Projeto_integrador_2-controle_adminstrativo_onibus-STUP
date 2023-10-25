var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

<<<<<<< HEAD
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
      res.status(404).json({ error: 'motorista não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar motorista por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post("/cadastrar", async (req, res, next) => {
  try {
    const { nome, foto } = req.body;

    const novamotorista = await prisma.motorista.create({
      data: {
        nome,
        foto
      },
    });

    res.json(novamotorista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a motorista." });
  }
});

router.put('/editar/:id', async function (req, res, next) {
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
      res.json({ message: "motorista excluído com sucesso." });
    } else {
      res.status(404).json({ error: "motorista não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o motorista." });
  }
});


=======
router.get("/", async (req, res) => {
  try {
    const motoristas = await prisma.motorista.findMany();
    res.json(motoristas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter os dados dos motoristas." });
  }
});

>>>>>>> d92ea9640eae8dd714c9d6b52bba8b773d765099
module.exports = router;
