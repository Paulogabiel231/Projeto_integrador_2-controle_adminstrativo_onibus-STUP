document.addEventListener("DOMContentLoaded", async (event) => {
    const url = window.location.href;
    const urlId = url.split("/").pop();
    console.log(urlId);

    try {
        const response = await axios.get(`http://localhost:3000/api/motoristas/visualizar/${urlId}`);
        const motorista = response.data;
        console.log(motorista);

        const fotoPreview = document.querySelector("#fotoPreview");
        if (motorista.foto) {
            fotoPreview.innerHTML = `<img src="http://localhost:3000/${motorista.foto}" alt="${motorista.nome}" width="250">`;
        } else {
            fotoPreview.innerHTML = "Não possui.";
        }
        if (motorista.nome != null) {
            document.querySelector("#nome").value = motorista.nome;
        }
        if (motorista.cpf != null) {
            document.querySelector("#cpf").value = motorista.cpf;
        }
        if (motorista.cnh != null) {
            document.querySelector("#cnh").value = motorista.cnh;
        }
        if (motorista.rg != null) {
            document.querySelector("#rg").value = motorista.rg;
        }
        if (motorista.nascimento != null) {
            document.querySelector("#nascimento").value = motorista.nascimento.split("T")[0];
        };
        if (motorista.sexo != null) {
            document.querySelector("#sexo").value = motorista.sexo;
        }
        if (motorista.telefone != null) {
            document.querySelector("#telefone").value = motorista.telefone;
        }
        if (motorista.email != null) {
            document.querySelector("#email").value = motorista.email;
        }

    } catch (error) {
        console.log("error ta aqui");
        alert(error)
    }

});
