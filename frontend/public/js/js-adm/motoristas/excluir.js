async function deletarMotorista(motoristaId, linhaTabela) {
    const confirmacao = confirm("Tem certeza que deseja excluir este Motorista?");

    if (confirmacao) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/motoristas/excluir/${motoristaId}`);

            console.log(response.data);
            alert("Motorista excluído com sucesso!");

            linhaTabela.remove();
        } catch (error) {
            console.error(error);
            alert("Erro ao excluir Motorista.");
        }
    }
}