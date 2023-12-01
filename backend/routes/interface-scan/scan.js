const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(bodyParser.json());
const prisma = new PrismaClient();

app.post('/cobrar', async (req, res) => {
    const { idCarteirinha } = req.body;
  
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { carteira: idCarteirinha },
      });
  
      if (!cliente) {
        res.status(200).json({ status: 'undefined' });
        return;
      }
  
      const novoSaldo = cliente.saldo - 5;
  
      if (novoSaldo < 0) {
        res.status(200).json({ status: 'false' });
      } else {
        await prisma.cliente.update({
          where: { carteira: idCarteirinha },
          data: { saldo: novoSaldo },
        });
  
        res.status(200).json({ status: 'true' });
      }
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  module.exports = router;