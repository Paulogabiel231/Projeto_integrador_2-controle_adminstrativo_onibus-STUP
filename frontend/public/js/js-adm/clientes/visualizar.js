document.addEventListener("DOMContentLoaded", async (event) => {
    const url = window.location.href;
    const urlId = url.split("/").pop();
    console.log(urlId);

    try {
        const response = await axios.get(`http://localhost:3000/api/clientes/visualizar/${urlId}`);
        const cliente = response.data;
        console.log(cliente);

        const fotoPreview = document.querySelector("#fotoPreview");
        if (cliente.foto) {
            fotoPreview.innerHTML = `<img src="http://localhost:3000/${cliente.foto}" alt="${cliente.nome}" width="250">`;
        } else {
            fotoPreview.innerHTML = "Não possui.";
        }
        if (cliente.nome != null) {
            document.querySelector("#nome").value = cliente.nome;
        }
        if (cliente.usuario_id != null) {
            document.querySelector("#usuario_id").value = cliente.usuario_id;
        }
        if (cliente.carteira != null) {
            document.querySelector("#carteira").value = cliente.carteira;
        }
        if (cliente.cpf != null) {
            document.querySelector("#cpf").value = cliente.cpf;
        }
        if (cliente.rg != null) {
            document.querySelector("#rg").value = cliente.rg;
        }
        if (cliente.nascimento != null) {
            document.querySelector("#nascimento").value = cliente.nascimento.split("T")[0];
        };
        if (cliente.tipo != null) {
            document.querySelector("#tipo").value = cliente.tipo;
        }
        if (cliente.sexo != null) {
            document.querySelector("#sexo").value = cliente.sexo;
        }
        if (cliente.telefone != null) {
            document.querySelector("#telefone").value = cliente.telefone;
        }
        if (cliente.email != null) {
            document.querySelector("#email").value = cliente.email;
        }
        if (cliente.saldo != null) {
            document.querySelector("#saldo").value = cliente.saldo;
        }
    } catch (error) {
        alert(error)
    }

});
