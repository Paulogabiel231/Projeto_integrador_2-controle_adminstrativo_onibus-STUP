const form = document.querySelector('#form-motorista');
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
        const formData = new FormData(form);
        const response = await axios.post('http://localhost:3000/api/motoristas/cadastrar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const { motorista } = response.data;
        alert("Motorista cadastrado com sucesso.");
        form.reset();
        window.location.href = `/adm/motorista/registro`;

    } catch (error) {
        console.log(error);
        alert(error.response.data.mensagem);
    }
});

