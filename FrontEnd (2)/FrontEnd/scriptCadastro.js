// === CADASTRO CLIENTE ===
const form = document.getElementById("cadastroCliente");
const respostaEl = document.getElementById("respostaCliente");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // PEGA OS VALORES DOS INPUTS
    const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
    try {
        const resposta = await fetch("http://localhost:5140/Cliente/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ 
                nome: document.getElementById("nome").value, 
                email: document.getElementById("email").value, 
                senha: document.getElementById("senha").value})
        });
        respostaEl.innerText = await resposta.text();
        if (resposta.ok) {
            form.reset();
            window.location.href = "login.html";
        }
    } catch (erro) {
        respostaEl.innerText = "Erro ao conectar com o servidor";
        console.error(erro);
    }
});
// === FIM CADASTRO CLIENTE ===