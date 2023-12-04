document.addEventListener('DOMContentLoaded', async () => {
    try {
        const id = window.location.pathname.split('/').pop();
        const response = await axios.get(`http://localhost:3000/api/usuarios/editar/${id}`);
        const usuario = response.data;

        let form = document.querySelector('#form');
        const inputs = {
            nome: usuario.nome,
            cpf: usuario.cpf,
            rg: usuario.rg,
            nascimento: usuario.nascimento ? usuario.nascimento.split("T")[0] : '',
            sexo: usuario.sexo,
            email: usuario.email,
            telefone: usuario.telefone,
            senha: usuario.senha,
            foto: usuario.foto,
        };

        for (const [campo, valor] of Object.entries(inputs)) {
            const inputElement = document.querySelector(`#${campo}`);
            if (inputElement) {
                if (campo === 'foto') {
                    const previewFoto = document.getElementById('fotoPreview');
                    previewFoto.innerHTML = `<p><img src="http://localhost:3000/${usuario.foto}" alt="${usuario.nome}" width="250"></p>`;
                } else {
                    inputElement.value = valor;
                }
            }
        }

        // abaixo fala sobre o botao subimit para finalizar edição
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
                form = document.querySelector('#form');
                const formData = new FormData(form);
                const nome = formData.get("nome");
                const email = formData.get("email");
                const telefone = formData.get("telefone");
                const cpf = formData.get("cpf");
                const rg = formData.get("rg");
                const nascimento = formData.get("nascimento");
                const sexo = formData.get("sexo");
                const senha = formData.get("senha");

                const data = { nome, cpf, telefone, email, rg, nascimento, sexo, senha  };


                await axios.put(`http://localhost:3000/api/usuarios/editar/${id}`, data);
                alert("Usuario Editado com Sucesso!")
                window.location.href = `/adm/usuario/visualizar/${id}`;
            } catch (error) {
                console.log(error);
                // alert(error.response.data.mensagem);
            }
        });
    } catch (error) {
        console.log(error);
        if (error?.response?.status === 404) {
            alert("Usuario não Encontrado.");
            window.location.href = "/adm/usuario/registro";
        } else {
            // alert(error.response.data.mensagem);
        }
    }

});
