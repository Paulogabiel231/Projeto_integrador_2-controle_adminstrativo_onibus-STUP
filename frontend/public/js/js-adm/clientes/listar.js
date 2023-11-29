document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tbody = document.querySelector('#clientes tbody');
        let clientesOriginal = await axios.get('http://localhost:3000/api/clientes/listar');
        clientesOriginal = [...clientesOriginal.data]; // Criar uma cópia para manter a lista original

        // Função para renderizar a tabela com os clientes fornecidos
        const renderizarTabela = (clientes) => {
            tbody.innerHTML = '';
            clientes.forEach(cliente => {
                const tr = document.createElement('tr');
                const codigoTd = document.createElement('td');
                codigoTd.textContent = cliente.id;
                tr.appendChild(codigoTd);
        
                const nomeTd = document.createElement('td');
                nomeTd.textContent = cliente.nome;
                tr.appendChild(nomeTd);
        
                const saldoTd = document.createElement('td');
                saldoTd.textContent = cliente.saldo;
                tr.appendChild(saldoTd);
        
                const cpfTd = document.createElement('td');
                cpfTd.textContent = cliente.cpf;
                tr.appendChild(cpfTd);
        
                const acoesTd = document.createElement('td');
                const exibirLink = `<a href="http://localhost:3001/adm/cliente/visualizar/${cliente.id}"><i class="fa-regular fa-eye" style="color: #6029a0;"></i></a>`;
                const editarLink = `<a href="http://localhost:3001/adm/cliente/editar/${cliente.id}"><i class="fa-solid fa-pen-to-square" style="color: #6029a0;"></i></a>`;
                const deletarLink = `<a href="#" onclick="deletarCliente(${cliente.id}, this.parentNode.parentNode); return false;"><i class="fa-solid fa-trash" style="color: #6029a0;"></i></a>`;
                acoesTd.innerHTML = `${exibirLink}  ${editarLink} ${deletarLink}`;
                tr.appendChild(acoesTd);
        
                tbody.appendChild(tr);
            });
        };

        // Renderizar a tabela com os clientes originais
        renderizarTabela(clientesOriginal);

        // Adicionar evento de clique ao botão de busca
        const btnBuscar = document.getElementById('btnBuscar');
        btnBuscar.addEventListener('click', () => {
            const inputNome = document.getElementById('inputNome');
            const nome = inputNome.value.trim().toLowerCase();

            // Limpar a tabela antes de realizar a busca
            tbody.innerHTML = '';

            // Filtrar clientes com base no nome
            const clientesFiltrados = clientesOriginal.filter(cliente => cliente.nome.toLowerCase().includes(nome));

            // Exibir clientes filtrados
            renderizarTabela(clientesFiltrados);
        });

        // Adicionar evento de clique ao botão de resetar
        const btnResetar = document.getElementById('btnResetar');
        btnResetar.addEventListener('click', () => {
            // Limpar a tabela e renderizar com os clientes originais
            tbody.innerHTML = '';
            renderizarTabela(clientesOriginal);

            // Limpar o campo de input
            const inputNome = document.getElementById('inputNome');
            inputNome.value = '';
        });

    } catch (error) {
        console.log(error);
        alert("Erro ao listar clientes");
    }
});