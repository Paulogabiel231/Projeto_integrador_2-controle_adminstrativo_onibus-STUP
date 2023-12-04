document.addEventListener("DOMContentLoaded", async (event) => {
    const url = window.location.href;
    const urlId = url.split("/").pop();

    function formatarHorario(data) {
        var date = new Date(data);
        var formattedTime = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: "UTC"
        });
        return formattedTime;
    }

    try {
        const response = await axios.get(`http://localhost:3000/api/linhas/editar/${urlId}`);
        const linha = response.data;

        document.querySelector("#numero").value = linha.numero;
        document.querySelector("#nome").value = linha.nome;
        document.querySelector("#origem").value = linha.origem;
        document.querySelector("#duracao").value = linha.duracao;
        document.querySelector("#destino").value = linha.destino;
        document.querySelector("#horarioPartida").value = formatarHorario(linha.horarioPartida);
    } catch (error) {
        alert("Erro ao puxar os dados das linhas");
    }

    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        //coleta dos dados do form
        const numero = document.querySelector("#numero").value;
        const nome = document.querySelector("#nome").value;
        const duracao = parseInt(document.querySelector("#duracao").value);  
        const origem = document.querySelector("#origem").value;
        const destino = document.querySelector("#destino").value;
        let horarioPartida = document.querySelector("#horarioPartida").value;
        horarioPartida = `0001-01-01T${horarioPartida}:00.000Z`

        const data = { nome, numero, duracao, horarioPartida, origem, destino };

        try {
            const response = await axios.put(`http://localhost:3000/api/linhas/editar/${urlId}`, data);

            alert("Linha editada com Sucesso!")
            window.location.href = `/adm/linha/visualizar/${urlId}`;

        } catch (error) {
            alert(error);
        }

    });
});