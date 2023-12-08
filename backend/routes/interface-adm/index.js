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

router.get('/tarifas/count', async (req, res) => {
  try {
    // Obter todas as tarifas
    const todasAsTarifas = await prisma.embarque.findMany();

    // Obter a lista de IDs únicos de tarifas
    const idsUnicosDeTarifas = new Set(todasAsTarifas.map(tarifa => tarifa.id));

    // Contar o número de IDs únicos de tarifas
    const quantidadeDeTarifas = idsUnicosDeTarifas.size;

    res.json({
      count: quantidadeDeTarifas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a contagem de tarifas.' });
  }
});


router.get('/clientes/count-menor-que-5', async (req, res) => {
  try {
    // Obter todos os clientes
    const todosOsClientes = await prisma.cliente.findMany();

    // Filtrar clientes com saldo menor que 5
    const clientesComSaldoMenorQue5 = todosOsClientes.filter(cliente => cliente.saldo < 5);

    // Contar o número de clientes com saldo menor que 5
    const quantidadeClientesComSaldoMenorQue5 = clientesComSaldoMenorQue5.length;

    res.json({
      count: quantidadeClientesComSaldoMenorQue5,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a contagem de clientes com saldo menor que 5.' });
  }
});


router.get('/clientes/ultimos-cadastrados', async (req, res) => {
  try {
    // Obter os últimos 5 clientes cadastrados
    const ultimosClientes = await prisma.cliente.findMany({
      take: 5,
      orderBy: {
        id: 'desc',
      },
    });

    console.log(ultimosClientes);  // Imprima os resultados aqui para ver se são os esperados

    res.json({ clientes: ultimosClientes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os últimos clientes cadastrados.' });
  }
});

router.get('/linhas/ultimas-cadastradas', async (req, res) => {
  try {
    // Obter as últimas 5 linhas cadastradas
    const ultimasLinhas = await prisma.linha.findMany({
      take: 5,
      orderBy: {
        id: 'desc',
      },
    });

    res.json({ linhas: ultimasLinhas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as últimas linhas cadastradas.' });
  }
});

// Adicione esta rota no seu arquivo de rotas (pode variar dependendo da estrutura do seu projeto)
router.get('/motoristas/ultimos-cadastrados', async (req, res) => {
  try {
    // Obter os últimos 5 motoristas cadastrados
    const ultimosMotoristas = await prisma.motorista.findMany({
      take: 5,
      orderBy: {
        id: 'desc',
      },
    });

    res.json({ motoristas: ultimosMotoristas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os últimos motoristas cadastrados.' });
  }
});





module.exports = router;
