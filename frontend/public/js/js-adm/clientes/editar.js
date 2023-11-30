document.addEventListener("DOMContentLoaded", async (event) => {
    const url = window.location.href;
    const urlId = url.split("/").pop();

    try {
        const response = await axios.get(`http://localhost:3000/api/clientes/editar/${urlId}`);
        const cliente = response.data;

        console.log(cliente)
        // document.querySelector("#foto").value = cliente.foto;
        document.querySelector("#nome").value = cliente.nome;
        document.querySelector("#usuario_id").value = cliente.usuario_id;
        document.querySelector("#carteira").value = cliente.carteira;
        document.querySelector("#cpf").value = cliente.cpf;    
        document.querySelector("#nascimento").value = cliente.nascimento.split("T")[0];
        document.querySelector("#tipo").value = cliente.tipo;
        document.querySelector("#sexo").value = cliente.sexo;
        document.querySelector("#telefone").value = cliente.telefone;
        document.querySelector("#email").value = cliente.email;
        document.querySelector("#saldo").value = cliente.saldo;
    } catch (error) {
        alert(error)
    }
    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (form) {
            // const foto = document.querySelector("#foto").value;
            const nome = document.querySelector("#nome").value;
            const carteira = document.querySelector("#carteira").value;
            const usuario_id = document.querySelector("#usuario_id").value;
            const cpf = document.querySelector("#cpf").value;
            const rg = document.querySelector("#rg").value;
            let nascimento = document.querySelector("#nascimento").value;
            nascimento = `${nascimento}T00:00:00Z`;
            const tipo = document.querySelector("#tipo").value;
            const sexo = document.querySelector("#sexo").value;
            const telefone = document.querySelector("#telefone").value;
            const email = document.querySelector("#email").value;
            const saldo = document.querySelector("#saldo").value;

            const data = { foto, nome, carteira, usuario_id, cpf, rg, nascimento, tipo, sexo, telefone, email, saldo  };

            try {

                const response = await axios.patch(`http://localhost:5000/api/clientes/editar/${urlId}`, data);
                const cliente = response.data
                console.log(cliente)

                // const id = response.data.id;    
                alert("Edição realizada sucesso");
                window.location.href = `http://localhost:3001/adm/cliente/registro`;
            } catch (error) {
                alert(error);
                
            }
        }
    });

});