const form = document.querySelector('#form-cliente');
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
        const formData = new FormData(form);
        const response = await axios.post('http://localhost:3000/api/clientes/cadastrar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert("Cliente cadastrado com sucesso!");
        const { cliente } = response.data;
        
        form.reset();
        window.location.href = `/adm/cliente/registro`;

    } catch (error) {
        console.log(error);
        alert(error.response.data.mensagem);
    }
});
