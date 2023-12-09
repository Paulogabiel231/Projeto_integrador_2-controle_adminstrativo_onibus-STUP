document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ul = document.querySelector('#linhas');
        let linhasOriginal = await axios.get('http://localhost:3000/api/linhas/listar');
        linhasOriginal = [...linhasOriginal.data]; // Criar uma cópia para manter a lista original

        // Função para renderizar a lista com os dados fornecidos
        const renderizarLista = (linhas) => {
            ul.innerHTML = '';
            linhas.forEach(linha => {
                const li = document.createElement('li');
                li.classList.add('text-primary', 'pb-1');

                const a = document.createElement('a');
                a.classList.add('text-decoration-none', 'text-primary', 'fw-medium');
                a.href = `/images/carteirinha-linhas-olaria.pdf`;
                a.download = `Linha ${linha.numero} - ${linha.nome}`;

                // Conteúdo do link
                a.textContent = `Linha ${linha.numero} - ${linha.nome}`;

                // Adiciona o link ao item da lista
                li.appendChild(a);

                // Adiciona o item da lista à lista
                ul.appendChild(li);
            });
        };

        renderizarLista(linhasOriginal);
    } catch (error) {
        console.error(error);
        alert("Erro ao listar Linhas");
    }
});



