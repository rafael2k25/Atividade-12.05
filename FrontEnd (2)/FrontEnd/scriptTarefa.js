const form = document.getElementById("cadastroTarefa");
const respostaEl = document.getElementById("respostaTarefa");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const resposta = await fetch("http://localhost:5140/Tarefa/cadastrarTarefa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ 
                descricao: document.getElementById("descricao").value, 
                status: document.getElementById("status").value})
        });
        respostaEl.innerText = await resposta.text();
        if (resposta.ok) {
            form.reset();
        }
    } catch (erro) {
        respostaEl.innerText = "Erro ao cadastrar tarefa";
        console.error(erro);
    }
});
// === FIM CADASTRO TAREFA MERMÃO ===