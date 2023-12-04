async function deletarLinha(linhaId, linhaTabela) {
    const confirmacao = confirm("Tem certeza que deseja excluir esta linha?");

    if (confirmacao) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/linhas/excluir/${linhaId}`);

            console.log(response.data);
            alert("Linha excluída com sucesso!");

            linhaTabela.remove();
        } catch (error) {
            console.error(error);
            alert("Erro ao excluir linha.");
        }
    }
}
