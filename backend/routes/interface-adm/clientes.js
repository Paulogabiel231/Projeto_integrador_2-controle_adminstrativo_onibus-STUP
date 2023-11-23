var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const path = require('path');


const prisma = new PrismaClient();

router.post("/cadastrar", async (req, res, next) => {
  try {
    const nome = req.body.nome;
    const usuario_id = Number(req.body.usuario_id);
    const saldo = req.body.saldo;
    const cpf = req.body.cpf;
    console.log(req.body);
    const data = { nome, usuario_id, saldo, cpf };
    console.log(data);
    const cliente = await prisma.cliente.create({ data });
    res.json({ cliente });
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

  console.log(path.join(__dirname, 'interface-adm', 'views', 'adm', 'clientes', 'visualizar-cliente.html'))

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
    });

    if (cliente) {
      // Renderize a página HTML de visualização do cliente e envie para o cliente
      res.sendFile(path.join(__dirname, 'interface-adm', 'views', 'adm', 'clientes', 'visualizar-cliente.html'));


    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.log(error);
    console.error('Erro ao buscar cliente por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


router.put('/editar/:id', async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { usuario_id, nome, saldo, cpf } = req.body;
    
    const clienteAtualizada = await prisma.cliente.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        usuario_id: parseInt(usuario_id),
        saldo: parseFloat(saldo),
        cpf: cpf,
      },
    });

    res.json(clienteAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a cliente.' });
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


module.exports = router;
