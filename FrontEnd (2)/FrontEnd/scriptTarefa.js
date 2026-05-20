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

// ATUALIZAR

const form = document.getElementById("formAtualizarTarefa");

const respostaEl = document.getElementById("respostaTarefa");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    try {

        const idTarefa = document.getElementById("idTarefa").value;

        const resposta = await fetch(
            `http://localhost:5140/Tarefa/atualizarTarefa/${idTarefa}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    descricao: document.getElementById("descricao").value,

                    status: document.getElementById("status").value
                })
            }
        );

        respostaEl.innerText = await resposta.text();

        if (resposta.ok) {

            form.reset();

        }

    } catch (erro) {

        respostaEl.innerText = "Erro ao conectar com o servidor";

        console.error(erro);
    }
});

// LOGOUT

const btnLogout = document.getElementById("Logout");

btnLogout.addEventListener("click", async () => {

    try {

        const resposta = await fetch("http://localhost:5140/Cliente/logout", {
            method: "GET",
            credentials: "include"
        });

        const mensagem = await resposta.text();

        respostaEl.innerText = mensagem;

        if (resposta.ok) {

            window.location.href = "login.html";

        }

    } catch (erro) {

        respostaEl.innerText = "Erro ao realizar logout";

        console.error(erro);

    }

});