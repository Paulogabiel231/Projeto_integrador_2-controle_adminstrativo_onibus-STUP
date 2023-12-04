document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tbody = document.querySelector('#linhas tbody');
        const btnBuscar = document.getElementById('btnBuscar');
        let linhasOriginal = await axios.get('http://localhost:3000/api/linhas/listar');
        linhasOriginal = [...linhasOriginal.data]; // Criar uma cópia para manter a lista original

        // Função para renderizar a tabela com os clientes fornecidos
        const renderizarTabela = (linhas) => {
            tbody.innerHTML = '';
            linhas.forEach(linha => {
                const tr = document.createElement('tr');

                const idTd = document.createElement('td');
                idTd.textContent = linha.id;
                tr.appendChild(idTd);

                const numeroTd = document.createElement('td');
                numeroTd.textContent = linha.numero;
                tr.appendChild(numeroTd);

                const nomeTd = document.createElement('td');
                nomeTd.textContent = linha.nome;
                tr.appendChild(nomeTd);

                const origemTd = document.createElement('td');
                origemTd.textContent = linha.origem;
                tr.appendChild(origemTd);

                const destinoTd = document.createElement('td');
                destinoTd.textContent = linha.destino;
                tr.appendChild(destinoTd);

                const acoesTd = document.createElement('td');
                const exibirLink = `<a href="http://localhost:3001/adm/linha/visualizar/${linha.id}"><i class="fa-regular fa-eye" style="color: #6029a0;"></i></a>`;
                const editarLink = `<a href="http://localhost:3001/adm/linha/editar/${linha.id}"><i class="fa-solid fa-pen-to-square" style="color: #6029a0;"></i></a>`;
                const deletarLink = `<a href="#" onclick="deletarLinha(${linha.id}, this.parentNode.parentNode); return false;"><i class="fa-solid fa-trash" style="color: #6029a0;"></i></a>`;
                acoesTd.innerHTML = `${exibirLink}  ${editarLink} ${deletarLink}`;
                tr.appendChild(acoesTd);

                tbody.appendChild(tr);
            });
        };

        renderizarTabela(linhasOriginal);



    } catch (error) {
        console.log(error);
        alert("Erro ao listar Linhas");
    }
});
