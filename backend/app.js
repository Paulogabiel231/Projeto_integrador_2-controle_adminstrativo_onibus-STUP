const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const linhasRouter = require('./routes/linhas');
<<<<<<< HEAD
const clientesRouter = require('./routes/clientes');
const motoristasRouter = require('./routes/motoristas');
const usuariosRouter = require('./routes/usuarios');
=======
const viagensRouter = require('./routes/viagens');
const motoristasRouter = require('./routes/motoristas');
>>>>>>> d92ea9640eae8dd714c9d6b52bba8b773d765099
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
<<<<<<< HEAD
app.use('/api/clientes', clientesRouter);
app.use('/api/motoristas', motoristasRouter);
app.use('/api/usuarios', usuariosRouter);
=======
app.use('/api/viagens', viagensRouter);
app.use('/api/motoristas', motoristasRouter);
>>>>>>> d92ea9640eae8dd714c9d6b52bba8b773d765099
app.use('/api/onibus', onibusRouter);

module.exports = app;
