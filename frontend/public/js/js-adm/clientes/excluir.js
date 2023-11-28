async function deletarCliente(clienteId, linhaTabela) {
    const confirmacao = confirm("Tem certeza que deseja excluir este cliente?");
  
    if (confirmacao) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/clientes/excluir/${clienteId}`);
            
            console.log(response.data);
            alert("Cliente excluído com sucesso!");

            linhaTabela.remove();
        } catch (error) {
            console.error(error);
            alert("Erro ao excluir cliente.");
        }
    } 
}