document.addEventListener('DOMContentLoaded', async () => {
    try {
    const id = window.location.pathname.split('/').pop();
    const response = await axios.get(`http://localhost:3000/api/clientes/editar/${id}`);
    const cliente = response.data;
    
    let form = document.querySelector('#form');
    const inputs = {
    nome: cliente.nome,
    carteira: cliente.carteira,    
    cpf: cliente.cpf,
    rg: cliente.rg,
    nascimento: cliente.nascimento,
    tipo: cliente.tipo,
    sexo: cliente.sexo,
    email: cliente.email,
    telefone: cliente.telefone,
    };
    
    for (const [campo, valor] of Object.entries(inputs)) {
    const inputElement = document.querySelector(`#${campo}`);
    if (inputElement) {
    inputElement.value = valor;
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
    const carteira = formData.get("carteira");
    const rg = formData.get("rg");
    const nascimento = formData.get("nascimento");
    const tipo = formData.get("tipo");

    const data = { nome, cpf, carteira, rg, nascimento, tipo };
    
    
    await axios.put(`http://localhost:3000/api/clientes/editar/${id}`, data);
    
    alert("Cliente editado com sucesso.");
    window.location.href = `/adm/cliente/registro`;
    } catch (error) {
    console.log(error);
    // alert(error.response.data.mensagem);
    }
    
    
    form.classList.add('was-validated');
    }, false);
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
