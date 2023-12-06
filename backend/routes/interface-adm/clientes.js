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

    const cliente = await prisma.cliente.create({ data });
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

router.put('/tirarsaldo', async (req, res) => {
  const { carteira, saldo } = req.body;
  const id = carteira;

  try {
    // Obtenha o cliente pelo ID
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    console.log(req.body);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Converta o saldo para um número
    const saldoNumero = Number(saldo);

    if (isNaN(saldoNumero)) {
      return res.status(400).json({ error: 'O saldo fornecido não é um número válido' });
    }

    // Some o saldo da requisição com o saldo atual do cliente
    // const saldoAtualizado = cliente.saldo ? cliente.saldo + saldoNumero : saldoNumero;
    const novoSaldo = Number(saldo) - Number(cliente.saldo);

    // Atualize o saldo do cliente no banco de dados
    const clienteAtualizado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { saldo: novoSaldo },
    });

    // console.log(clienteAtualizado);

    res.status(200).json({ id: clienteAtualizado.id, saldo: clienteAtualizado.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



router.post('/liberar', async (req, res, next) => {
  const clienteId = req.body.clienteId; // Mantenha como string
  console.log(req.body);
  console.log(clienteId);
  try {
    // Use uma transação Prisma para garantir atomicidade
    const novoEmbarque = await prisma.$transaction(async (prisma) => {
      // Consulte a tabela cliente para obter informações sobre a isenção e o saldo
      const cliente = await prisma.cliente.findUnique({
        where: { carteira: clienteId },
      });
      // Verifique se o cliente existe
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      console.log(cliente);
      
      let valorDaPassagem = 5;  // Valor padrão da passagem

      if (cliente.tipo === "1") { // comum
        valorDaPassagem = 5;
      }
      else if (cliente.tipo === "2" && cliente.tipo === "5") { // estudante
        valorDaPassagem = 2.5;
      } else { // idoso=3, pcd=4
        valorDaPassagem = 0;
      }

      const isento = cliente.tipo === "3" || cliente.tipo === "4";

      // Verifique se o cliente tem saldo suficiente
      if (!isento && cliente.saldo < valorDaPassagem) {
        throw new Error('Saldo insuficiente');
      }

      // Execute a inserção no banco de dados usando Prisma
      const embarque = await prisma.embarque.create({
        data: {
          cliente_id: cliente.id,
          tarifa: valorDaPassagem
        },
      });

      // Atualize o saldo do cliente se necessário usando decrement
      if (!isento) {
        await prisma.cliente.update({
          where: { carteira: clienteId }, // Atualize pelo campo correto
          data: {
            saldo: {
              decrement: valorDaPassagem,
            },
          },
        });
      }

      return embarque;
    });

    // Envie uma resposta de sucesso
    res.status(201).json({ message: 'Embarque cadastrado com sucesso!', embarque: novoEmbarque });
  } catch (error) {
    console.error('Erro ao cadastrar embarque:', error);
    if (error.message === 'Cliente não encontrado') {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else if (error.message === 'Saldo insuficiente') {
      res.status(402).json({ error: 'Saldo insuficiente' }); // 402 Payment Required
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
});

module.exports = router;
