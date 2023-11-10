document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        form.classList.add("was-validated");

        if (form.checkValidity()) {
            try {
                const nome = document.querySelector("#nome").value;
                const cpf = document.querySelector("#cpf").value;
                const saldo = document.querySelector("#saldo").value;

                const data = { nome, cpf, saldo };

                const response = await axios.post("http://localhost:3000/api/clientes/cadastrar", data);
                const id = response.data.id;

                // Adicione aqui o código para manipular o sucesso, se necessário
                console.log("Cliente cadastrado com sucesso. ID:", id);
                document.querySelector("#form").reset();
            } catch (error) {
                // Adicione aqui o código para manipular o erro
                console.error("Erro ao cadastrar cliente:", error);
            }
        }
    });
});
