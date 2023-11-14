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
  const linhas = await prisma.linha.findMany();
  res.json(linhas);
});

router.get("/buscar/:id", async function (req, res, next) {
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
    const { nome, origem, destino, horarioPartida, duracao } = req.body;

    const linha = await prisma.linha.create({
      data: {
        nome,
        origem,
        destino,
        horarioPartida: `1970-01-01T${horarioPartida}:00Z`,
        duracao: parseInt(duracao),
      },
    });
    res.json(linha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a linha." });
  }
});

// router.post('/cadastrar', async (req, res) => {
//     try {
//         const { body } = req;

//         // Converta o valor do campo horarioPartida para o formato desejado (por exemplo, 'HH:mm')
//         const horarioPartidaFormatado = formatarHorarioPartida(horarioPartida);

//         function formatarHorarioPartida(horarioPartida) {
//           // Horário padrão no formato HH:mm
//           const formatoPadrao = /^([01]\d|2[0-3]):([0-5]\d)$/;

//           // Verifique se o horarioPartida está no formato desejado
//           if (!formatoPadrao.test(horarioPartida)) {
//               throw new Error('Formato de horário inválido.');
//           }

//           // Nenhuma modificação necessária, já está no formato correto
//           return horarioPartida;
//       }

//         console.log('Dados recebidos:', {
//             nome: body.get('nome'),
//             origem: body.get('origem'),
//             destino: body.get('destino'),
//             horarioPartida: horarioPartidaFormatado,
//             duracao: body.get('duracao'),
//         });

//         const novaLinha = await prisma.linha.create({
//             data: {
//                 nome: body.get('nome'),
//                 origem: body.get('origem'),
//                 destino: body.get('destino'),
//                 horarioPartida: horarioPartidaFormatado,
//                 duracao: body.get('duracao'),
//             },
//         });

//         res.status(201).json({ linha: novaLinha, mensagem: 'Linha cadastrada com sucesso.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ mensagem: 'Erro ao processar a requisição.' });
//     }
// });

// Função para formatar o campo horarioPartida conforme necessário
function formatarHorarioPartida(horarioPartida) {
  // Realize qualquer lógica de formatação necessária, dependendo do formato de entrada
  // Por exemplo, você pode precisar adicionar ou remover zeros à esquerda para garantir que o formato seja 'HH:mm'

  // Aqui, estou assumindo que o horarioPartida já está no formato desejado
  return horarioPartida;
}

module.exports = router;

// Exporte o router
module.exports = router;

router.put("/editar/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, origem, destino, horarioPartida, duracao } = req.body;

    const linhaAtualizada = await prisma.linha.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        origem: origem,
        destino: destino,
        horarioPartida: `1970-01-01T${horarioPartida}:00Z`,
        duracao: parseInt(duracao),
      },
    });

    res.json(linhaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a linha." });
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

router.get("/qtd-horarios-por-linha", async function (req, res, next) {
  try {
    const linhas = await prisma.linha.groupBy({
      by: ["nome"],
      _count: true,
      orderBy: {
        _count: {
          nome: "desc",
        },
      },
    });

    res.json(linhas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar consulta." });
  }
});

module.exports = router;
