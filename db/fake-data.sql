-- Inserir dados para simular 10 motoristas diferentes
INSERT INTO motorista (nome, foto) VALUES
  ('João Silva', '//images/joao_silva.jpg'),
  ('Maria Souza', '//images/maria_souza.jpg'),
  ('Carlos Oliveira', '//images/carlos_oliveira.jpg'),
  ('Ana Pereira', '//images/ana_pereira.jpg'),
  ('Fernando Santos', '//images/fernando_santos.jpg'),
  ('Amanda Costa', '//images/amanda_costa.jpg'),
  ('Pedro Rodrigues', '//images/pedro_rodrigues.jpg'),
  ('Larissa Fernandes', '//images/larissa_fernandes.jpg'),
  ('Rafaela Lima', '//images/rafaela_lima.jpg'),
  ('Gustavo Almeida', '//images/gustavo_almeida.jpg');

-- Inserir dados para simular 10 linhas de São Paulo
INSERT INTO linha (nome, origem, destino, horarioPartida, duracao) VALUES
  ('Linha 1', 'São Paulo', 'Campinas', '08:00:00', 120),
  ('Linha 2', 'São Paulo', 'Santos', '09:00:00', 90),
  ('Linha 3', 'São Paulo', 'Ribeirão Preto', '10:00:00', 180),
  ('Linha 4', 'São Paulo', 'Sorocaba', '11:00:00', 75),
  ('Linha 5', 'São Paulo', 'São José dos Campos', '12:00:00', 150),
  ('Linha 6', 'São Paulo', 'Bauru', '13:00:00', 210),
  ('Linha 7', 'São Paulo', 'Araraquara', '14:00:00', 120),
  ('Linha 8', 'São Paulo', 'Marília', '15:00:00', 180),
  ('Linha 9', 'São Paulo', 'Presidente Prudente', '16:00:00', 240),
  ('Linha 10', 'São Paulo', 'Itapetininga', '17:00:00', 90);

  -- Inserir mais 5 linhas com origem em Caraguatatuba
INSERT INTO linha (nome, origem, destino, horarioPartida, duracao) VALUES
  ('Linha 11', 'Caraguatatuba', 'São Paulo', '08:30:00', 150),
  ('Linha 12', 'Caraguatatuba', 'Campinas', '09:30:00', 180),
  ('Linha 13', 'Caraguatatuba', 'Santos', '10:30:00', 120),
  ('Linha 14', 'Caraguatatuba', 'Ribeirão Preto', '11:30:00', 240),
  ('Linha 15', 'Caraguatatuba', 'Sorocaba', '12:30:00', 180);


-- Inserir dados para simular 5 ônibus diferentes
INSERT INTO onibus (placa) VALUES
  ('ABC1234'),
  ('DEF5678'),
  ('GHI9012'),
  ('JKL3456'),
  ('MNO7890');