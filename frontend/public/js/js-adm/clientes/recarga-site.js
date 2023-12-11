document.addEventListener('DOMContentLoaded', async function () {
    const token = getCookie('token');
    const decodedToken = decodeToken(token);

    console.log(decodedToken);

    if (!token || !decodedToken || !decodedToken.clienteId) {
        window.location.href = 'http://localhost:3001/login';
    }

    const tokenDecodificado = decodeToken(token);
    console.log(tokenDecodificado);

    try {
        const clienteId = decodedToken.clienteId;
        const response = await axios.get(`http://localhost:3000/api/clientes/visualizar/${clienteId}`);
        const cliente = response.data;
        console.log(response.data);

        const primeiroNome = extrairPrimeiroNome(cliente.nome);

        document.querySelector("#nomeHeader").textContent = primeiroNome;

        document.querySelector("#id").innerHTML = cliente.id;
        console.log(cliente.id);
        document.querySelector("#carteiraCliente").innerHTML = cliente.carteira;
        console.log(cliente.carteira);
        document.querySelector("#saldo").innerHTML = cliente.saldo;
        console.log(cliente.saldo);
        document.querySelector("#nome").innerHTML = cliente.nome;
        console.log(cliente.nome);


    } catch (error) {
        alert(error.message);
    }

    const formPost = document.querySelector('#form');

    // aqui nós devemos pegar os dados do formulário que vamos enviar para recarregar
    formPost.addEventListener('submit', async (event) => {
        event.preventDefault();

        const valor = document.querySelector('#valorRecarga').value;
        const dados = { valor };

        try {
            const clienteId = decodedToken.clienteId;
            const response = await axios.post(`http://localhost:3000/api/clientes/recarregar/${clienteId}`, dados);
            const cliente = response.data;
            alert(`Sucesso! Novo saldo: ${parseFloat(cliente.saldo)}`);

            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    });
});


function extrairPrimeiroNome(nomeCompleto) {
    const partesNome = nomeCompleto.split(' ');
    return partesNome[0];
}

