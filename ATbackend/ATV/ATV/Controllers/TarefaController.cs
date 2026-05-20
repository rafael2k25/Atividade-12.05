using Microsoft.AspNetCore.Mvc;
using ATV.Models;
using ATV.Data;

namespace ATV.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TarefaController : ControllerBase
    {
        private readonly ClienteDBContext _context;
     
        public TarefaController(ClienteDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult TarefasUsuario()
        {
            var sessaoUsuario = HttpContext.Session.GetString("IdLogado");

            if (sessaoUsuario == null)
            {
                return Unauthorized("Faça login antes");
            }

            var idLogado = Request.Cookies["IdLogado"];

            if (idLogado != null)
            {
                var resultado = from u in _context.Clientes
                                join t in _context.Tarefas
                                on u.Id equals t.IdCliente
                                where u.Id == int.Parse(idLogado)
                                select new
                                {
                                    Usuario = u.Nome,
                                    u.Email,
                                    Tarefa = t.Descricao,
                                    t.Status,t.Id
                                };

                return Ok(resultado.ToList());
            }

            return Unauthorized("Faça login antes");
        }
        [HttpGet("{IdTarefa}")]
        public IActionResult BuscarTarefa(int IdTarefa)
        {
            var id = HttpContext.Session.GetString("IdLogado");
            if (id == null)
            {
                return Unauthorized("Usuário não logado");
            }

            var tarefa = _context.Tarefas.Find(IdTarefa);
            if (tarefa == null)
            {
                return NotFound("Tarefa não encontrada");
            }

            return Ok(new
            {
                descricao = tarefa.Descricao,
                status = tarefa.Status
            });
        }

        [HttpPost("cadastrarTarefa")]
        public IActionResult CadastrarTarefa(Tarefa tarefa)
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Usuário não logado");
            }
          
           var idCookie = Request.Cookies["IdLogado"];

            if (idCookie != null)
            {
              
                tarefa.IdCliente = int.Parse(idCookie);
            }
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Ok("Tarefa cadastrada com sucesso!");
        }
        

        [HttpPut("atualizarTarefa/{IdTarefa}")]
        public IActionResult AtualizarTarefa(int IdTarefa, Tarefa tarefa)
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Usuário não logado");
            }

            var tarefaBanco = _context.Tarefas.Find(IdTarefa);

            if (tarefaBanco == null)
            {
                return NotFound("Tarefa não encontrada");
            }

            tarefaBanco.Descricao = tarefa.Descricao;
            tarefaBanco.Status = tarefa.Status;

            _context.SaveChanges();

            return Ok("Tarefa atualizada");
        }

        [HttpDelete("deletarTarefa/{IdTarefa}")]
        public IActionResult DeletarTarefa(int IdTarefa)
        {
            var id = HttpContext.Session.GetString("IdLogado");

            if (id == null)
            {
                return Unauthorized("Usuário não logado");
            }

            var idtarefa = _context.Tarefas.Find(IdTarefa);

            if (idtarefa == null)
            {
                return NotFound("Tarefa não encontrada");
            }

            _context.Tarefas.Remove(idtarefa);
            _context.SaveChanges();

            return Ok("Tarefa deletada");
        }


    }
}