document.addEventListener('DOMContentLoaded', () => {


    const form = document.querySelector('#form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault()


        try {
            const formData = new FormData(form);
            const data = {
                nome: formData.get('nome'),
                origem: formData.get('origem'),
                numero: formData.get('numero'),
                destino: formData.get('destino'),
                horarioPartida: formData.get('horarioPartida'),
                duracao: formData.get('duracao'),

            };

            const response = await axios.post('http://localhost:3000/api/linhas/cadastrar', data);
            alert("Linha Cadastrada com Sucesso!")
            window.location.href = `/adm/linha/registro`;
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
            alert("deu ruim");
        }

        // form.classList.add('was-validated')
    }, false)
});