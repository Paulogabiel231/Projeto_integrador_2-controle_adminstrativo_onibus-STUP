use pi2db;

alter table linha
add column numero    varchar(3);

alter table motorista
add column  rg          varchar(15),
add column cpf          varchar(11),
add column  cnh			varchar(20),
add column  nascimento  date,
add column  sexo		varchar(1),
add column  email		varchar(100),
add column  telefone	varchar(9);

alter table cliente
add column  foto        varchar(200),
add column  rg          varchar(200),
add column  carteira    varchar(10),
add column  tipo        varchar(1),
add column  sexo        varchar(1),
add column  telefone    varchar(9),
add column  email       varchar(100),
add column  nascimento  date;

alter table usuario
add column  foto        varchar(200),
add column  cpf         varchar(11),
add column  rg          varchar(200),
add column  nascimento   date,
add column  telefone    varchar(9),
add column  sexo        varchar(1);




