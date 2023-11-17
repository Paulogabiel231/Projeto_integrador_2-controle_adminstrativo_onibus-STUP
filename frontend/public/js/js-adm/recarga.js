async function enviarRecarga() {
    try {
        const clienteId = document.getElementById('clienteId').value;
        const recargaValor = document.getElementById('recargaValor').value;

        // Verifica se o ID e o valor são válidos (pode adicionar mais validações se necessário)

        const response = await axios.post('http://localhost:3000/api/clientes/recarregar', {
            clienteId,
            recargaValor
        });

        alert('Recarga realizada com sucesso!');
    } catch (error) {
        console.error(error);
        alert('Erro ao realizar a recarga. Verifique os dados e tente novamente.');
    }
}