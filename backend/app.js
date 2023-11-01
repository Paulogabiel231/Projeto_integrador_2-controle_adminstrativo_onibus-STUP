const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const linhasRouter = require('./routes/linhas');
const clientesRouter = require('./routes/clientes');
// const motoristasRouter = require('./routes/motoristas');
const usuariosRouter = require('./routes/usuarios');
const onibusRouter = require('./routes/onibus');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/linhas', linhasRouter);
app.use('/api/clientes', clientesRouter);
// app.use('/api/motoristas', motoristasRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/onibus', onibusRouter);

module.exports = app;
