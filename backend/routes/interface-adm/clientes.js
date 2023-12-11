var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const upload = require("../../middlewares/fileUpload");

const prisma = new PrismaClient();

router.post("/cadastrar", upload.single("foto"), async (req, res, next) => {
  try {
    console.log(req.body);

    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const rg = req.body.rg;
    const usuario_id = Number(req.body.usuario_id)
    const email = req.body.email;
    const saldo = req.body.saldo;
    const tipo = req.body.tipo;
    const carteira = req.body.carteira;
    const sexo = req.body.sexo;
    const telefone = req.body.telefone;
    const foto = req.file?.path;
    const nascimento = req.body.nascimento ? new Date(req.body.nascimento).toISOString() : null;

    const data = {
      nome, cpf, rg,
      saldo, email,
      tipo, carteira,
      sexo, telefone, foto,
      usuario_id, nascimento
    };

    const cliente = await prisma.cliente.create({ data: data });

    res.json(cliente)
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Não foi possível realizar o cadastro do Cliente." });
  }
});


router.get("/listar", async function (req, res, next) {
  const clientes = await prisma.cliente.findMany({
    orderBy: {
      id: 'desc', // Isso ordenará pelos IDs de forma decrescente, você pode usar outro campo de data se preferir
    },
  });
  res.json(clientes);
});

router.get("/visualizar/:id", async function (req, res, next) {
  const clienteId = parseInt(req.params.id);

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar Cliente por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get("/editar/:id", async function (req, res, next) {
  const clienteId = parseInt(req.params.id);
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar Cliente por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/editar/:id', async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, carteira, usuario_id, cpf, rg, nascimento, tipo, sexo, email, telefone, saldo } = req.body;

    // Crie um objeto com os campos que serão atualizados
    const dadosAtualizacao = {
      nome: nome,
      carteira: carteira,
      usuario_id: parseInt(usuario_id),
      cpf: cpf,
      rg: rg,
      tipo: tipo,
      sexo: sexo,
      email: email,
      telefone: telefone,
      saldo: parseFloat(saldo),
    };

    // Adicione o campo 'nascimento' ao objeto de atualização se estiver presente
    if (nascimento) {
      dadosAtualizacao.nascimento = new Date(nascimento);
    }

    const clienteAtualizada = await prisma.cliente.update({
      where: {
        id: id,
      },
      data: dadosAtualizacao,
    });

    res.json(clienteAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o cliente.' });
  }
});

router.delete("/excluir/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const clienteExcluida = await prisma.cliente.delete({
      where: {
        id: id,
      },
    });

    if (clienteExcluida) {
      res.json({ message: "cliente excluída com sucesso." });
    } else {
      res.status(404).json({ error: "cliente não encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a cliente." });
  }
});

// Rota para recarregar saldo do cliente
router.post("/recarregar-saldo", async (req, res) => {
  const clienteId = Number(req.body.clienteId);
  const valorRecarga = Number(req.body.valorRecarga);

  try {
    // Use o método "increment" do Prisma para recarregar o saldo diretamente no banco de dados
    const clienteAtualizado = await prisma.cliente.update({
      where: { id: clienteId },
      data: {
        saldo: {
          increment: valorRecarga,
        },
      },
    });

    // Envie uma resposta de sucesso
    res
      .status(200)
      .json({
        message: "Saldo recarregado com sucesso!",
        cliente: clienteAtualizado,
      });
  } catch (error) {
    console.error("Erro ao recarregar saldo:", error);
    if (error.code === "P2025") {
      // Código de erro específico para cliente não encontrado
      res.status(404).json({ error: "Cliente não encontrado" });
    } else {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
});

router.post('/recarregar/:id', /*authenticateToken,*/ async (req, res) => {
  const id = parseInt(req.params.id)
  const dados = req.body

  const cliente = await prisma.cliente.update({
    data: {
      saldo: { increment: dados.valor }
    },
    where: {
      id: id
    }
  })

  res.json(cliente)
})


router.post('/liberar', async (req, res) => {
  const codCartao = req.body.clienteId;
  console.log(req.body)
  let tarifa = 5

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        carteira: codCartao
      }
    });

    console.log(cliente.tipo);

    if (cliente.tipo == '2' || cliente.tipo == '3' || cliente.tipo == '4' || cliente.tipo == '5') {
      tarifa = 2.5
    }

    if (cliente.saldo < tarifa) {
      return res.status(402).json({
        message: "saldo insuficiente"
      })
    }

    const novoCliente = await prisma.cliente.update({
      data: {
        saldo: { decrement: tarifa }
      },
      where: {
        carteira: codCartao
      }
    });

    console.log(cliente.saldo);
    res.status(200).json({
      tarifa: tarifa,
      id: cliente.id,
      tipo: cliente.tipo


    })

    const embarque = await prisma.embarque.create({
      data: {
        cliente_id: cliente.id,
        tarifa: tarifa,
        horario: new Date() 
      },
    });

    console.log(embarque);
    return embarque;

  } catch (exception) {
    console.log(exception);
    res.status(400).json({
      error: exception.message
    });
  }
});

module.exports = router;
