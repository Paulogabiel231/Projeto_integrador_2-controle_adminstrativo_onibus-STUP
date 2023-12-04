var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const linhas = await prisma.linha.findMany();
    res.json(linhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter os dados das linhas." });
  }
});

router.get("/listar", async function (req, res, next) {
  const linha = await prisma.linha.findMany({
    orderBy: {
      id: 'desc', // Isso ordenará pelos IDs de forma decrescente, você pode usar outro campo de data se preferir
    },
  });
  res.json(linha);
});

router.get("/visualizar/:id", async function (req, res, next) {
  const linhaId = parseInt(req.params.id);

  try {
    const linha = await prisma.linha.findUnique({
      where: {
        id: linhaId,
      },
    });

    if (linha) {
      res.json(linha);
    } else {
      res.status(404).json({ error: "Linha não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar linha por ID:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/cadastrar", async (req, res, next) => {
  try {
    const nome = req.body.nome;
    const numero = req.body.numero;
    const duracao = Number(req.body.duracao);
    const horarioPartida = `1970-01-01T${req.body.horarioPartida}:00Z`;
    const origem = req.body.origem;
    const destino = req.body.destino;

    const data = {
      nome, numero, duracao,
      horarioPartida, origem,
      destino
    };

    const linha = await prisma.linha.create({ data });
    res.json(linha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a linha." });
  }
});


// Seu código de inicialização do servidor aqui...


router.get("/editar/:id", async function (req, res, next) {
  const linhaId = parseInt(req.params.id);
  try {
    const linha = await prisma.linha.findUnique({
      where: {
        id: linhaId,
      },
    });

    if (linha) {
      res.json(linha);
    } else {
      res.status(404).json({ error: 'Linha não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a linha." });
  }
});

router.put('/editar/:id', async (req, res) => {

  try {
    const id = parseInt(req.params.id)
    const dados = req.body

    const linha = await prisma.linha.update({
      data: dados,
      where: {
        id: id
      }
    })
    res.status(200).json(linha)

  } catch (error) {
    console.log(error);
    }
  });



router.delete("/excluir/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const linhaExcluida = await prisma.linha.delete({
      where: {
        id: id,
      },
    });

    if (linhaExcluida) {
      res.json({ message: "Linha excluída com sucesso." });
    } else {
      res.status(404).json({ error: "Linha não encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a linha." });
  }
});


module.exports = router;
