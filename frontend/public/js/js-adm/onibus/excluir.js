async function deletarOnibus(OnibusId, linhaTabela) {
    const confirmacao = confirm("Tem certeza que deseja excluir esta Ônibus?");

    if (confirmacao) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/onibus/excluir/${OnibusId}`);

            console.log(response.data);
            alert("Ônibus excluída com sucesso!");

            linhaTabela.remove();
        } catch (error) {
            console.error(error);
            alert("Erro ao excluir Ônibus.");
        }
    }
}
