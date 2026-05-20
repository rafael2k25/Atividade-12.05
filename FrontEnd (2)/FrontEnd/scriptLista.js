const form = document.getElementById("formConsultaTarefa");
const respostaEl = document.getElementById("respostaTarefa");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const resposta = await fetch("http://localhost:5140/Tarefa", {
            method: "GET",
            credentials: "include"
        });

        if (!resposta.ok) {

            respostaEl.innerText = await resposta.text();
            return;

        }

        const tarefas = await resposta.json();

        respostaEl.innerHTML = "";

        tarefas.forEach(tarefa => {

            respostaEl.innerHTML += `
                <div>
        
                <br> <p>
                        <strong>Tarefa:</strong>
                        ${tarefa.tarefa}
                    </p>
        
                    <p>
                        <strong>Status:</strong>
                        ${tarefa.status}
                    </p>
        
                    <p>
                        <strong>ID da Tarefa:</strong>
                        ${tarefa.id}
                    </p> <br>
        
                    <button class="btnDeletar" onclick="deletarTarefa(${tarefa.id})">
                    Deletar
                    </button>
                    
                    <button class="btnAtualizar" onclick="atualizarTarefa(${tarefa.id})">
                    Atualizar
                    </button> <br>
        
                    <br> <hr>
        
                </div>
            `;
        });

    } catch (erro) {

        respostaEl.innerText = "Erro ao buscar tarefas";
        console.error(erro);

    }

});

// ATUALIZAR

async function atualizarTarefa(IdTarefa) {

    const novaDescricao = prompt("Digite a nova descrição:");

    const novoStatus = prompt("Digite o novo status:");

    if (!novaDescricao || !novoStatus) {

        alert("Preencha todos os campos");

        return;
    }

    try {

        const resposta = await fetch(
            `http://localhost:5140/Tarefa/atualizarTarefa/${IdTarefa}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    descricao: novaDescricao,

                    status: novoStatus
                })
            }
        );

        const mensagem = await resposta.text();

        alert(mensagem);

        if (resposta.ok) {

            location.reload();

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar tarefa");
    }
}

// DELETAR

async function deletarTarefa(IdTarefa) {

    try {

        const resposta = await fetch(`http://localhost:5140/Tarefa/deletarTarefa/${IdTarefa}`, {
            method: "DELETE",
            credentials: "include"
        });

        const mensagem = await resposta.text();

        alert(mensagem);

        location.reload();

    } catch (erro) {

        console.error(erro);

    }

}

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