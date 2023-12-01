leitor.addEventListener("input", async function () {
    const codigoCartao = leitor.value.trim();
  
    if (codigoCartao.length > 0) {
      try {
        const response = await fetch("http://localhost:3000/api/scan/cobrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idCarteirinha: codigoCartao }),
        });
  
        const data = await response.json();
  
        if (data.status === "undefined") {
          setTimeout(() => {
            window.location.href = "/scan/undefined";
          }, 5000); // Atraso de 5 segundos
        } else if (data.status === "false") {
          alert("Saldo insuficiente");
          setTimeout(() => {
            window.location.href = "/scan/false";
          }, 5000); // Atraso de 5 segundos
        } else if (data.status === "true") {
          alert("Operação bem-sucedida");
          setTimeout(() => {
            window.location.href = "/scan/true";
          }, 5000); // Atraso de 5 segundos
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  });
  