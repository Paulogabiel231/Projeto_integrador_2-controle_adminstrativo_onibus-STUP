document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/index/clientes/count');
        const clientesCount = response.data.count;

        // Atualizar o conteúdo do span com a contagem de clientes
        console.log(clientesCount);
        const clientesCountSpan = document.getElementById('clientesCount');
        clientesCountSpan.textContent = clientesCount.toString();
    } catch (error) {
        console.error(error);
        alert('Erro ao obter a contagem de clientes.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/index/clientes/count-menor-que-5');
        const clienteMenor5 = response.data.count;

        // Atualizar o conteúdo do span com a contagem de linhas
        const clienteMenor5Span = document.getElementById('clienteMenor5');
        clienteMenor5Span.textContent = clienteMenor5.toString();
    } catch (error) {
        console.error(error);
        alert('Erro ao obter a contagem de linhas.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/index/motoristas/count');
        const motoristasCount = response.data.count;

        // Atualizar o conteúdo do span com a contagem de motoristas
        const motoristasCountSpan = document.getElementById('motoristasCount');
        motoristasCountSpan.textContent = motoristasCount.toString();
    } catch (error) {
        console.error(error);
        alert('Erro ao obter a contagem de motoristas.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/index/linhas/count');
        const linhasCount = response.data.count;

        // Atualizar o conteúdo do span com a contagem de linhas
        const linhasCountSpan = document.getElementById('linhasCount');
        linhasCountSpan.textContent = linhasCount.toString();
    } catch (error) {
        console.error(error);
        alert('Erro ao obter a contagem de linhas.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/index/tarifas/count');
        const tarifasCount = response.data.count;

        // Atualizar o conteúdo do span com a contagem de linhas
        const tarifasCountSpan = document.getElementById('tarifasCount');
        tarifasCountSpan.textContent = tarifasCount.toString();
    } catch (error) {
        console.error(error);
        alert('Erro ao obter a contagem de linhas.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const tbody = document.querySelector('#clientesTable tbody');
      const clientes = await axios.get('http://localhost:3000/api/index/clientes/ultimos-cadastrados');
  
      tbody.innerHTML = clientes.data.map(cliente => `
        <tr>
          <td>${cliente.id}</td>
          <td>${cliente.nome}</td>
          <td>${cliente.cpf}</td>
          <td>${(() => {
            switch (cliente.tipo) {
              case '1':
                return 'Comum';
              case '2':
                return 'Estudante';
              case '3':
                return 'Idoso';
              case '4':
                return 'PCD';
              case '5':
                return 'Vale Transporte';
              default:
                return 'Não Preenchido';
            }
          })()}</td>
          <td><span class="label ${cliente.saldo >= 5 ? 'label-success' : 'label-danger'}">R$ ${cliente.saldo}</span></td>
        </tr>
      `).join('')
    } catch (error) {
      console.log(error);
      alert("Erro ao listar clientes");
    }
  });
  

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tbody = document.querySelector('#linhasTable tbody');
        let linhasOriginal = await axios.get('http://localhost:3000/api/index/linhas/ultimas-cadastradas');
        linhasOriginal = [...linhasOriginal.data.linhas]; // Criar uma cópia para manter a lista original

        // Função para renderizar a tabela com as linhas fornecidas
        const renderizarTabela = (linhas) => {
            tbody.innerHTML = '';
            linhas.forEach(linha => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <td>${linha.numero}</td>
            <td>${linha.nome}</td>
            <td>${linha.origem}</td>
            <td>${linha.destino}</td>
          `;
                tbody.appendChild(tr);
            });
        };

        renderizarTabela(linhasOriginal);

    } catch (error) {
        console.log(error);
        alert("Erro ao listar linhas");
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tbody = document.querySelector('#motoristasTable tbody');
        let motoristasOriginal = await axios.get('http://localhost:3000/api/index/motoristas/ultimos-cadastrados');
        motoristasOriginal = [...motoristasOriginal.data.motoristas]; // Criar uma cópia para manter a lista original

        // Função para renderizar a tabela com os motoristas fornecidos
        const renderizarTabela = (motoristas) => {
            tbody.innerHTML = '';
            motoristas.forEach(motorista => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <td>${motorista.id}</td>
            <td>${motorista.nome}</td>
            <td>${motorista.cpf}</td>
            <td>${motorista.telefone}</td>
          `;
                tbody.appendChild(tr);
            });
        };

        renderizarTabela(motoristasOriginal);

    } catch (error) {
        console.log(error);
        alert("Erro ao listar motoristas");
    }
});









