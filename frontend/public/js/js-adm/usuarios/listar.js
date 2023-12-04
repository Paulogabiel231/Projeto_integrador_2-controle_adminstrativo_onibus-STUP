document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tbody = document.querySelector('#usuarios tbody');
        let usuariosOriginal = await axios.get('http://localhost:3000/api/usuarios/listar');
        usuariosOriginal = [...usuariosOriginal.data]; // Criar uma cópia para manter a lista original

        // Função para renderizar a tabela com os clientes fornecidos
        const renderizarTabela = (usuarios) => {
            tbody.innerHTML = '';
            usuarios.forEach(usuario => {
                const tr = document.createElement('tr');
                const codigoTd = document.createElement('td');
                codigoTd.textContent = usuario.id;
                tr.appendChild(codigoTd);
                const fotoTd = document.createElement('td');
                if (usuario.foto) {
                    fotoTd.innerHTML = `<img src="http://localhost:3000/${usuario.foto}" alt="${usuario.nome}" width="60">`;
                } else {
                    fotoTd.innerHTML = "Não possui.";
                }
                tr.appendChild(fotoTd);

                const nomeTd = document.createElement('td');
                nomeTd.textContent = usuario.nome;
                tr.appendChild(nomeTd);

                const cpfTd = document.createElement('td');
                cpfTd.textContent = usuario.cpf;
                tr.appendChild(cpfTd);

                const emailTd = document.createElement('td');
                emailTd.textContent = usuario.email;
                tr.appendChild(emailTd);



                const acoesTd = document.createElement('td');
                const exibirLink = `<a href="http://localhost:3001/adm/usuario/visualizar/${usuario.id}"><i class="fa-regular fa-eye" style="color: #6029a0;"></i></a>`;
                const editarLink = `<a href="http://localhost:3001/adm/usuario/editar/${usuario.id}"><i class="fa-solid fa-pen-to-square" style="color: #6029a0;"></i></a>`;
                acoesTd.innerHTML = `${exibirLink}  ${editarLink}` ;
                tr.appendChild(acoesTd);

                tbody.appendChild(tr);
            });
        };

        renderizarTabela(usuariosOriginal);

        // Adicionar evento de clique ao botão de busca
        const btnBuscar = document.getElementById('btnBuscar');
        btnBuscar.addEventListener('click', () => {
            const inputNome = document.getElementById('inputNome');
            const nome = inputNome.value.trim().toLowerCase();


            tbody.innerHTML = '';

            const usuariosFiltrados = usuariosOriginal.filter(usuario => usuario.nome.toLowerCase().includes(nome));


            renderizarTabela(usuariosFiltrados);
        });

        // Adicionar evento de clique ao botão de resetar
        const btnResetar = document.getElementById('btnResetar');
        btnResetar.addEventListener('click', () => {
            tbody.innerHTML = '';
            renderizarTabela(usuariosOriginal);

            // Limpar o campo de input
            const inputNome = document.getElementById('inputNome');
            inputNome.value = '';
        });

    } catch (error) {
        console.log(error);
        alert("Erro ao listar Usuários");
    }
});