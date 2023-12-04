var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


router.get("/listar", async function (req, res, next) {
  const onibus = await prisma.onibus.findMany({
    orderBy: {
      id: 'desc', // Isso ordenará pelos IDs de forma decrescente, você pode usar outro campo de data se preferir
    },
  });
  res.json(onibus);
});

router.get("/visualizar/:id", async function (req, res, next) {
  const onibusId = parseInt(req.params.id); 

  try {
    const onibus = await prisma.onibus.findUnique({
      where: {
        id: onibusId,
      },
    });

    if (onibus) {
      res.json(onibus);
    } else {
      res.status(404).json({ error: 'onibus não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar onibus por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post("/cadastrar", async (req, res, next) => {
  try {
    const { placa } = req.body;

    const novaonibus = await prisma.onibus.create({
      data: {
        placa
      },
    });

    res.json(novaonibus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o Ônibus." });
  }
});

router.get("/editar/:id", async function (req, res, next) {
  const onibusId = parseInt(req.params.id);
  try {
    const onibus = await prisma.onibus.findUnique({
      where: {
        id: onibusId,
      },
    });

    if (onibus) {
      res.json(onibus);
    } else {
      res.status(404).json({ error: 'onibus não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar onibus por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/editar/:id', async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { placa } = req.body;

    // Crie um objeto com os campos que serão atualizados
    const dadosAtualizacao = {
      placa: placa,
    };
    const onibusAtualizado = await prisma.onibus.update({
      where: {
        id: id,
      },
      data: dadosAtualizacao,
    });

    res.json(onibusAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o onibus.' });
  }
});

router.delete("/excluir/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const onibusExcluida = await prisma.onibus.delete({
      where: {
        id: id,
      },
    });

    if (onibusExcluida) {
      res.json({ message: "onibus excluída com sucesso." });
    } else {
      res.status(404).json({ error: "onibus não encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a onibus." });
  }
});

router.get("/", async (req, res) => {
  try {
    const onibus = await prisma.onibus.findMany();
    res.json(onibus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter os dados dos ônibus." });
  }
});

module.exports = router;
