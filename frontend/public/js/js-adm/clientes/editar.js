document.addEventListener('DOMContentLoaded', async () => {
    try {
        const id = window.location.pathname.split('/').pop();
        const response = await axios.get(`http://localhost:3000/api/clientes/editar/${id}`);
        const cliente = response.data;

        let form = document.querySelector('#form');
        const inputs = {
            nome: cliente.nome,
            usuario_id: cliente.usuario_id,
            carteira: cliente.carteira,
            cpf: cliente.cpf,
            rg: cliente.rg,
            nascimento: cliente.nascimento ? cliente.nascimento.split("T")[0] : '',
            tipo: cliente.tipo,
            sexo: cliente.sexo,
            email: cliente.email,
            telefone: cliente.telefone,
            saldo: cliente.saldo,
            foto: cliente.foto,
        };

        for (const [campo, valor] of Object.entries(inputs)) {
            const inputElement = document.querySelector(`#${campo}`);
            if (inputElement) {
                if (campo === 'foto') {
                    const previewFoto = document.getElementById('fotoPreview');
                    previewFoto.innerHTML = `<p><img src="http://localhost:3000/${cliente.foto}" alt="${cliente.nome}" width="250"></p>`;
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
                const usuario_id = formData.get("usuario_id");
                const telefone = formData.get("telefone");
                const cpf = formData.get("cpf");
                const carteira = formData.get("carteira");
                const rg = formData.get("rg");
                const nascimento = formData.get("nascimento");
                const tipo = formData.get("tipo");
                const sexo = formData.get("sexo");
                const saldo = formData.get("saldo");

                const data = { nome, cpf, carteira, telefone, usuario_id, email, rg, nascimento, tipo, sexo, saldo };


                await axios.put(`http://localhost:3000/api/clientes/editar/${id}`, data);

                alert("Cliente editado com sucesso!");
                window.location.href = `/adm/cliente/visualizar/${id}`;
            } catch (error) {
                console.log(error);
                // alert(error.response.data.mensagem);
            }
        });
    } catch (error) {
        console.log(error);

        if (error?.response?.status === 404) {
            alert("Cliente não encontrado.");
            window.location.href = "/adm/cliente/registro";
        } else {
            // alert(error.response.data.mensagem);
        }
    }

});
