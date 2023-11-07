const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

//  aplicativos

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rotas app adm

const indexAdmnistrativoRouter = require('./routes/interface-adm/index');
const usersRouter = require('./routes/interface-adm/');
const linhasRouter = require('./routes/interface-adm/linhas');
const clientesRouter = require('./routes/interface-adm/clientes');
const usuariosRouter = require('./routes/interface-adm/usuarios');
const onibusRouter = require('./routes/interface-adm/onibus');

// rotas do navegador que vão ser usadas baseado nas conts la encima
app.use('/adm', indexAdmnistrativoRouter);
app.use('/users', usersRouter);
app.use('/api/linhas', linhasRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/onibus', onibusRouter);

// rotas self

const SelfRouterIndex = require('./routes/interface-self/index');


const require = ('./routes/interface-self/');
const linhasRouter = require('./routes/interface-self/');
const clientesRouter = require('./routes/interface-self/');
const usuariosRouter = require('./routes/interface-self/');
const onibusRouter = require('./routes/interface-self/');

// rotas do navegador que vão ser usadas baseado nas conts la encima

app.use('/', SelfRouterIndex);

// rotas scan

const indexScanRouter = require('./routes/interface-scan/index');
const require = ('./routes/interface-self/');
const linhasRouter = require('./routes/interface-self/');
const clientesRouter = require('./routes/interface-self/');
const usuariosRouter = require('./routes/interface-self/');
const onibusRouter = require('./routes/interface-self/');

// rotas do navegador que vão ser usadas baseado nas conts la encima

app.use('/scan', indexSelfRouter);
app.use('/users', usersRouter);
app.use('/api/linhas', linhasRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/onibus', onibusRouter);

