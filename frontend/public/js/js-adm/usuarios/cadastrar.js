
const form = document.querySelector('#form');
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
        const formData = new FormData(form);
        const response = await axios.post('http://localhost:3000/api/usuarios/cadastrar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert("Usuario Cadastrado com Sucesso!");
        window.location.href = `/adm/usuario/registro`;
    } catch (error) {
        console.log(error);
        alert(error.response.data.mensagem);
    }
});
