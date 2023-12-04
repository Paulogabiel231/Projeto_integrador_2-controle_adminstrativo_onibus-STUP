document.addEventListener("DOMContentLoaded", async (event) => {
    const url = window.location.href;
    const urlId = url.split("/").pop();
    console.log(urlId);

    try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/visualizar/${urlId}`);
        const usuario = response.data;
        console.log(usuario);

        const fotoPreview = document.querySelector("#fotoPreview");
        if (usuario.foto) {
            fotoPreview.innerHTML = `<img src="http://localhost:3000/${usuario.foto}" alt="${usuario.nome}" width="250">`;
        } else {
            fotoPreview.innerHTML = "Não possui.";
        }
        if (usuario.nome != null) {
            document.querySelector("#nome").value = usuario.nome;
        }
        if (usuario.cpf != null) {
            document.querySelector("#cpf").value = usuario.cpf;
        }
        if (usuario.rg != null) {
            document.querySelector("#rg").value = usuario.rg;
        }
        if (usuario.nascimento != null) {
            document.querySelector("#nascimento").value = usuario.nascimento.split("T")[0];
        };
        if (usuario.sexo != null) {
            document.querySelector("#sexo").value = usuario.sexo;
        }
        if (usuario.telefone != null) {
            document.querySelector("#telefone").value = usuario.telefone;
        }
        if (usuario.email != null) {
            document.querySelector("#email").value = usuario.email;
        }
        if (usuario.senha != null) {
            document.querySelector("#senha").value = usuario.senha;
        }
    } catch (error) {
        alert(error)
    }

});
