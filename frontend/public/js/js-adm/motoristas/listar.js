document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tbody = document.querySelector('#motoristas tbody');
        let motoristasOriginal = await axios.get('http://localhost:3000/api/motoristas/listar');
        motoristasOriginal = [...motoristasOriginal.data]; // Criar uma cópia para manter a lista original

        // Função para renderizar a tabela com os motoristas fornecidos
        const renderizarTabela = (motoristas) => {
            tbody.innerHTML = '';
            motoristas.forEach(motorista => {
                const tr = document.createElement('tr');
                const codigoTd = document.createElement('td');
                codigoTd.textContent = motorista.id;
                tr.appendChild(codigoTd);

                const fotoTd = document.createElement('td');
                if (motorista.foto) {
                    fotoTd.innerHTML = `<img src="http://localhost:3000/${motorista.foto}" alt="${motorista.nome}" width="60">`;
                } else {
                    fotoTd.innerHTML = "Não possui.";
                }
                tr.appendChild(fotoTd);

                const nomeTd = document.createElement('td');
                nomeTd.textContent = motorista.nome;
                tr.appendChild(nomeTd);

                const cpfTd = document.createElement('td');
                cpfTd.textContent = motorista.cpf;
                tr.appendChild(cpfTd);
                
                const cnhTd = document.createElement('td');
                cnhTd.textContent = motorista.cpf;
                tr.appendChild(cnhTd);


                const acoesTd = document.createElement('td');
                const exibirLink = `<a href="http://localhost:3001/adm/motorista/visualizar/${motorista.id}"><i class="fa-regular fa-eye" style="color: #6029a0;"></i></a>`;
                const editarLink = `<a href="http://localhost:3001/adm/motorista/editar/${motorista.id}"><i class="fa-solid fa-pen-to-square" style="color: #6029a0;"></i></a>`;
                const deletarLink = `<a href="#" onclick="deletarMotorista(${motorista.id}, this.parentNode.parentNode); return false;"><i class="fa-solid fa-trash" style="color: #6029a0;"></i></a>`;
                acoesTd.innerHTML = `${exibirLink}  ${editarLink} ${deletarLink}`;
                tr.appendChild(acoesTd);

                tbody.appendChild(tr);
            });
        };

        // Renderizar a tabela com os motoristas originais
        renderizarTabela(motoristasOriginal);

        // Adicionar evento de clique ao botão de busca
        const btnBuscar = document.getElementById('btnBuscar');
        btnBuscar.addEventListener('click', () => {
            const inputNome = document.getElementById('inputNome');
            const nome = inputNome.value.trim().toLowerCase();

            // Limpar a tabela antes de realizar a busca
            tbody.innerHTML = '';

            // Filtrar motoristas com base no nome
            const motoristasFiltrados = motoristasOriginal.filter(motorista => motorista.nome.toLowerCase().includes(nome));

            // Exibir motoristas filtrados
            renderizarTabela(motoristasFiltrados);
        });

        // Adicionar evento de clique ao botão de resetar
        const btnResetar = document.getElementById('btnResetar');
        btnResetar.addEventListener('click', () => {
            // Limpar a tabela e renderizar com os motoristas originais
            tbody.innerHTML = '';

            renderizarTabela(motoristasOriginal);
            const inputNome = document.getElementById('inputNome');
            inputNome.value = '';
        });

    } catch (error) {
        console.log(error);
        alert("Erro ao listar motoristas");
    }
});

