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

    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (form) {
            const foto = document.querySelector("#foto").value;
            const nome = document.querySelector("#nome").value;
            const cpf = document.querySelector("#cpf").value;
            const cnh = document.querySelector("#cnh").value;
            const rg = document.querySelector("#rg").value;
            let nascimento = document.querySelector("#nascimento").value;
            nascimento = `${nascimento}T00:00:00Z`;
            const sexo = document.querySelector("#sexo").value;
            const telefone = document.querySelector("#telefone").value;
            const email = document.querySelector("#email").value;

            const data = { foto, nome, cpf, cnh,  rg, nascimento, sexo, telefone, email};

            try {

                const response = await axios.put(`http://localhost:3000/api/motoristas/editar/${urlId}`, data);
                const cliente = response.data
                console.log(cliente)

                alert("Edição realizada sucesso");
                window.location.href = `http://localhost:3001/adm/motosita/registro`;
            } catch (error) {
                alert(error);

            }
        }
    });

