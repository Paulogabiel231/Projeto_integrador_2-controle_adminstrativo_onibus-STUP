const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
require('dotenv').config();


//  aplicativos

const corsOptions = {
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// rotas app adm

const clientesRouter = require('./routes/interface-adm/clientes');
const LinhasRouter = require('./routes/interface-adm/linhas');
const UsuariosRouter = require('./routes/interface-adm/usuarios');
const MotoristasRouter = require('./routes/interface-adm/motoristas');
const OnibusRouter = require('./routes/interface-adm/onibus');
const authRouter = require("./routes/interface-adm/auth");
const adminRouter = require("./routes/interface-adm/admin");

app.use('/api/linhas', LinhasRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/usuarios', UsuariosRouter);
app.use('/api/motoristas', MotoristasRouter);
app.use('/api/onibus', OnibusRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

module.exports = app;
