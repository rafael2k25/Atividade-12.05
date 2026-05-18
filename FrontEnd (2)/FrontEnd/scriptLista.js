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
        
                    <p>
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
                    </p>
        
                    <button onclick="deletarTarefa(${tarefa.id})">
                        Deletar
                    </button>
        
                    <hr>
        
                </div>
            `;
        });

    } catch (erro) {

        respostaEl.innerText = "Erro ao buscar tarefas";
        console.error(erro);

    }

});

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