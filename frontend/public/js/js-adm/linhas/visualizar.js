document.addEventListener("DOMContentLoaded", async (event) => {
    const url = window.location.href;
    const urlId = url.split("/").pop();
    console.log(urlId);
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
        const response = await axios.get(`http://localhost:3000/api/linhas/visualizar/${urlId}`);
        const linha = response.data;
        console.log(linha);

        if (linha.numero != null) {
            document.querySelector("#numero").value = linha.numero;
        }
        if (linha.nome != null) {
            document.querySelector("#nome").value = linha.nome;
        }
        if (linha.duracao != null) {
            document.querySelector("#duracao").value = linha.duracao;
        }
        if (linha.origem != null) {
            document.querySelector("#origem").value = linha.origem;
        }
        if (linha.horarioPartida != null) {
            document.querySelector("#horarioPartida").value = formatarHorario(linha.horarioPartida);;
        }
        if (linha.destino != null) {
            document.querySelector("#destino").value = linha.destino;
        }


    } catch (error) {
        console.log("error ta aqui");
        alert(error)
    }

});
