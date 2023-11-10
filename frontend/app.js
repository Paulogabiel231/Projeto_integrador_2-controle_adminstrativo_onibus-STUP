const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rotas self 
const SelfRouterAplicativo = require('./routes/interface-self/aplicativo');
const SelfRouterAtendimento = require('./routes/interface-self/atendimento');
const SelfRouterCarteirinhaLinhas = require('./routes/interface-self/carteirinha-linhas');
const SelfRouterCentralAjuda = require('./routes/interface-self/central-ajuda');
const SelfRouterEmpresas = require('./routes/interface-self/empresas');
const SelfRouterIndex = require('./routes/interface-self/index');
const SelfRouterLogin = require('./routes/interface-self/login');
// rotas adm
const AdmRouterIndex = require('./routes/interface-adm/index');
const AdmRouterCliente = require('./routes/interface-adm/cliente');
const AdmRouterLinha = require('./routes/interface-adm/linha');
// const AdmRouterMotorista = require('./routes/interface-adm/motorista');
// const AdmRouterOnibus = require('./routes/interface-adm/onibus');
// rotas scan
const ScanRouterAproximar = require('./routes/interface-scan/index');


// app self
app.use('/aplicativo', SelfRouterAplicativo);
app.use('/atendimento', SelfRouterAtendimento);
app.use('/carteirinha-linhas', SelfRouterCarteirinhaLinhas);
app.use('/central-ajuda', SelfRouterCentralAjuda);
app.use('/empresas', SelfRouterEmpresas);
app.use('/', SelfRouterIndex);
app.use('/login', SelfRouterLogin);

// app scan
app.use('/scan', ScanRouterAproximar);

// rotas adm

app.use('/adm', AdmRouterIndex);
app.use('/adm/cliente', AdmRouterCliente);
app.use('/adm/linha', AdmRouterLinha);
// app.use('/adm/motorista', AdmRouterMotorista);
// app.use('/adm/onibus', AdmRouterOnibus);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
