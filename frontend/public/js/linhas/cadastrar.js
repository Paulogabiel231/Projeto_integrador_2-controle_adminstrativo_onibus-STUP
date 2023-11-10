document.addEventListener("DOMContentLoaded", () => {
  displayFlashMessage();

  const form = document.querySelector("#form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const origem = document.querySelector("#origem").value;
      const destino = document.querySelector("#destino").value;
      const horarioPartida = document.querySelector("#horarioPartida").value;
      const duracao = document.querySelector("#duracao").value;

      const data = { nome, origem, destino, horarioPartida, duracao };
      console.log("Linha cadastrada com sucesso. ID:", id);
      document.querySelector("#form").reset();
      try {
        const response = await axios.post("http://localhost:3000/api/linhas/cadastrar", data);
        const id = response.data.id;

      } catch (error) {
        console.log("erro ao criar a linhas", error)
      }
    }
    
    form.classList.add("was-validated");
  });
});