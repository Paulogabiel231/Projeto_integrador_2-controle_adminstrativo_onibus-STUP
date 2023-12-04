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