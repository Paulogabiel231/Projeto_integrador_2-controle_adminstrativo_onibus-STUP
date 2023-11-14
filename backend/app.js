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
const authRouter = require("./routes/interface-adm/auth");
const adminRouter = require("./routes/interface-adm/admin");

app.use('/api/linhas', LinhasRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/usuarios', UsuariosRouter);
app.use('/api/motoristas', MotoristasRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
// const indexAdmnistrativoRouter = require('./routes/interface-adm/index');
// const usersRouter = require('./routes/interface-adm/clientes/users');
// const linhasRouter = require('./routes/interface-adm/linhas');
// const usuariosRouter = require('./routes/interface-adm/usuarios');
// const onibusRouter = require('./routes/interface-adm/onibus');

// // rotas do navegador que vão ser usadas baseado nas conts la encima
// app.use('/adm', indexAdmnistrativoRouter);
// app.use('/users', usersRouter);
// app.use('/api/linhas', linhasRouter);
// app.use('/api/clientes', clientesRouter);
// app.use('/api/usuarios', usuariosRouter);
// app.use('/api/onibus', onibusRouter);


// rotas self

// const SelfRouterIndex = require('./routes/interface-self/index');


// const require = ('./routes/interface-self/');
// const linhasRouter = require('./routes/interface-self/');
// const clientesRouter = require('./routes/interface-self/');
// const usuariosRouter = require('./routes/interface-self/');
// const onibusRouter = require('./routes/interface-self/');

//  rotas do navegador que vão ser usadas baseado nas conts la encima

// app.use('/', SelfRouterIndex);

// rotas scan

// const indexScanRouter = require('./routes/interface-scan/index');
// const require = ('./routes/interface-self/');
// const linhasRouter = require('./routes/interface-self/');
// const clientesRouter = require('./routes/interface-self/');
// const usuariosRouter = require('./routes/interface-self/');
// const onibusRouter = require('./routes/interface-self/');

// // rotas do navegador que vão ser usadas baseado nas conts la encima

// app.use('/scan', indexSelfRouter);
// app.use('/users', usersRouter);
// app.use('/api/linhas', linhasRouter);
// app.use('/api/clientes', clientesRouter);
// app.use('/api/usuarios', usuariosRouter);
// app.use('/api/onibus', onibusRouter);

module.exports = app;
