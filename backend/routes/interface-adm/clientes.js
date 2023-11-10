var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

router.get("/listar", async function (req, res, next) {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

router.get("/buscar/:id", async function (req, res, next) {
  
  const clienteId = parseInt(req.params.id); 

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
    });

    // console.log(cliente);
    if (cliente) {
      res.json(cliente);
    } else {

      res.status(404).json({ error: 'cliente não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar cliente por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


router.post("/cadastrar", async (req, res, next) => {
  try {
    const {usuario_id, nome, cpf, saldo } = req.body;

    const novacliente = await prisma.cliente.create({
      data: {
        nome,
        usuario_id: parseInt(usuario_id),
        cpf,
        saldo: parseFloat(saldo)
      },
    });

    res.json(novacliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a cliente." });
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
