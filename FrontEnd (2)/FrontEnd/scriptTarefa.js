// CADASTRAR

const formCadastro = document.getElementById("cadastroTarefa");
const respostaCadastroEl = document.getElementById("respostaTarefa");

formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const resposta = await fetch(
            "http://localhost:5140/Tarefa/cadastrarTarefa",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",

                body: JSON.stringify({
                    descricao: document.getElementById("descricao").value,
                    status: document.getElementById("status").value
                })
            }
        );

        respostaCadastroEl.innerText = await resposta.text();

        if (resposta.ok) {
            formCadastro.reset();
        }

    } catch (erro) {

        respostaCadastroEl.innerText = "Erro ao cadastrar tarefa";
        console.error(erro);
    }
});


// ATUALIZAR

const formAtualizar = document.getElementById("formAtualizarTarefa");
const respostaAtualizarEl = document.getElementById("respostaTarefa");

formAtualizar.addEventListener("submit", async (event) => {

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

        respostaAtualizarEl.innerText = await resposta.text();

        if (resposta.ok) {
            formAtualizar.reset();
        }

    } catch (erro) {

        respostaAtualizarEl.innerText = "Erro ao conectar com o servidor";
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