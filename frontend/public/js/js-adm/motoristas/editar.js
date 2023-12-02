document.addEventListener('DOMContentLoaded', async () => {
    try {
        const id = window.location.pathname.split('/').pop();
        const response = await axios.get(`http://localhost:3000/api/motoristas/editar/${id}`);
        const motorista = response.data;

        let form = document.querySelector('#form');
        const inputs = {
            nome: motorista.nome,
            cpf: motorista.cpf,
            rg: motorista.rg,
            cnh: motorista.cnh,
            nascimento: motorista.nascimento ? motorista.nascimento.split("T")[0] : '',
            sexo: motorista.sexo,
            email: motorista.email,
            telefone: motorista.telefone,
            foto: motorista.foto,
        };

        for (const [campo, valor] of Object.entries(inputs)) {
            const inputElement = document.querySelector(`#${campo}`);
            if (inputElement) {
                if (campo === 'foto') {
                    const previewFoto = document.getElementById('fotoPreview');
                    previewFoto.innerHTML = `<p><img src="http://localhost:3000/${motorista.foto}" alt="${motorista.nome}" width="250"></p>`;
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
                const cpf = formData.get("cpf");
                const cnh = formData.get("cnh");
                const rg = formData.get("rg");
                const nascimento = formData.get("nascimento");
                const sexo = formData.get("sexo");
                const email = formData.get("email");
                const telefone = formData.get("telefone");


                const data = { nome, cpf, cnh, rg, nascimento, sexo, email, telefone  };


                await axios.put(`http://localhost:3000/api/motoristas/editar/${id}`, data);

                alert("Motorista editado com sucesso!");
                window.location.href = `/adm/motorista/registro`;
            } catch (error) {
                console.log(error);
                // alert(error.response.data.mensagem);
            }
        });
    } catch (error) {
        console.log(error);

        if (error?.response?.status === 404) {
            alert("Motorista não encontrado.");
            window.location.href = "/adm/motorista/registro";
        } else {
            // alert(error.response.data.mensagem);
        }
    }

});
