var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get('/clientes/count', async (req, res) => {
  try {
    // Obter todos os clientes
    const todosOsClientes = await prisma.cliente.findMany();

    // Filtrar clientes com saldo maior que 5
    const clientesComSaldoMaiorQue5 = todosOsClientes.filter(cliente => cliente.saldo > 5);

    // Contar o número de clientes com saldo maior que 5
    const quantidadeClientesComSaldoMaiorQue5 = clientesComSaldoMaiorQue5.length;

    res.json({
      count: quantidadeClientesComSaldoMaiorQue5,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a contagem de clientes.' });
  }
});

router.get('/motoristas/count', async (req, res) => {
  try {
    // Obter todos os motoristas
    const todosOsMotoristas = await prisma.motorista.findMany();

    // Contar o número de motoristas
    const quantidadeMotoristas = todosOsMotoristas.length;

    res.json({
      count: quantidadeMotoristas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a contagem de motoristas.' });
  }
});

router.get('/linhas/count', async (req, res) => {
  try {
    // Obter todas as linhas
    const todasAsLinhas = await prisma.linha.findMany();

    // Contar o número de linhas
    const quantidadeLinhas = todasAsLinhas.length;

    res.json({
      count: quantidadeLinhas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a contagem de linhas.' });
  }
});


module.exports = router;
