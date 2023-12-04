
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tbody = document.querySelector('#onibus tbody');
        let onibusOriginal = await axios.get('http://localhost:3000/api/onibus/listar');
        onibusOriginal = [...onibusOriginal.data]; // Criar uma cópia para manter a lista original

        // Função para renderizar a tabela com os clientes fornecidos
        const renderizarTabela = (onibus) => {
            tbody.innerHTML = '';
            onibus.forEach(onibus => {
                const tr = document.createElement('tr');
                const codigoTd = document.createElement('td');
                codigoTd.textContent = onibus.id;
                tr.appendChild(codigoTd);

                const placaTd = document.createElement('td');
                placaTd.textContent = onibus.placa;
                tr.appendChild(placaTd);



                const acoesTd = document.createElement('td');
                const exibirLink = `<a href="http://localhost:3001/adm/onibus/visualizar/${onibus.id}"><i class="fa-regular fa-eye" style="color: #6029a0;"></i></a>`;
                const editarLink = `<a href="http://localhost:3001/adm/onibus/editar/${onibus.id}"><i class="fa-solid fa-pen-to-square" style="color: #6029a0;"></i></a>`;
                const deletarLink = `<a href="#" onclick="deletarOnibus(${onibus.id}, this.parentNode.parentNode); return false;"><i class="fa-solid fa-trash" style="color: #6029a0;"></i></a>`;
                acoesTd.innerHTML = `${exibirLink}  ${editarLink} ${deletarLink}`;
                tr.appendChild(acoesTd);

                tbody.appendChild(tr);
            });
        };

        renderizarTabela(onibusOriginal);

    } catch (error) {
        console.log(error);
        alert("Erro ao listar Usuários");
    }
});