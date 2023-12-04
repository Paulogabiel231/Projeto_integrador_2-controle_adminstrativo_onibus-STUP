document.addEventListener("DOMContentLoaded", async (event) => {
    const url = window.location.href;
    const urlId = url.split("/").pop();

    try {
        const response = await axios.get(`http://localhost:3000/api/onibus/editar/${urlId}`);
        const onibus = response.data;

        document.querySelector("#placa").value = onibus.placa;

    } catch (error) {
        alert("Erro ao puxar os dados das linhas");
    }

    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const placa = document.querySelector("#placa").placa;
        const data = { placa };

        try {
            const response = await axios.put(`http://localhost:3000/api/linhas/editar/${urlId}`, data);

            alert("Linha editada com Sucesso!")
            window.location.href = `/adm/onibus/visualizar/${urlId}`;

        } catch (error) {
            alert(error);
        }

    });
});