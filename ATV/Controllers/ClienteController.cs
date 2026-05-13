using ATV.Data;
using ATV.Models;
using Microsoft.AspNetCore.Mvc;

namespace ATV.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteDBContext _context;
        public ClienteController(ClienteDBContext context)
        {
            _context = context;
        }

        [HttpGet("ler-cookie")]
        public IActionResult LerCookie() 
        {
            var usuarioCookie = Request.Cookies["idLogin"];

            if (usuarioCookie != null)
            {
                return NotFound("Cookie não encontrado.");
            }
            return Ok($"Usuário: {usuarioCookie}");
        }

        [HttpGet("Inicio")]
        public IActionResult Inicio() 
        {
            var usuario = HttpContext.Session.GetString("idLogin");

            if ( usuario == null)
            {
                return Unauthorized(new { mensagem = "Não autenticado" });
            }
            return Ok(new {mensagem = "Usuário autenticado", email = usuario});
        }

        [HttpPost("login")]
        public IActionResult Id(Cliente cliente)
        {
            var clientes = _context.Clientes.Where(c => c.Email.Equals(cliente.Email) && c.Senha.Equals(cliente.Senha)).ToList();
            if (clientes.Count == 0) { return Unauthorized("login ou senha errados, ");  }

            HttpContext.Session.SetString("idLogin", clientes[0].Id.ToString());
            Response.Cookies.Append("idLogin", clientes[0].Id.ToString(),
                new CookieOptions
                {
                    Expires = DateTime.Now.AddMinutes(30),
                    HttpOnly = true
                }
                );
            return (Ok("Login realizado com sucesso!"));
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(".AspNetCore.Session");
            HttpContext.Session.Clear();
            Response.Cookies.Delete("idLogin");
            return Ok("Logout realizado com sucesso!");
        }

        [HttpGet]
        public IActionResult SolicitaTodasPessoas()
        {

            return Ok(_context.Clientes.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult ConsultaPessoasID(int id)
        {
            var pessoa = _context.Clientes.Find(id);

            if (pessoa == null)
                return NotFound("Pessoa não encontrada.");

            return Ok(pessoa);
        }

        [HttpGet("nome/{nome}")]
        public IActionResult ConsultaPessoasNome(string nome)
        {
            var pessoas = _context.Clientes.Where(p => p.Nome.Contains(nome)).ToList();

            if (!pessoas.Any())
                return NotFound("Nenhuma pessoa encontrada com esse nome.");

            return Ok(pessoas);
        }

        [HttpPost("cadastrar")]
        public IActionResult CadastraPessoas(Cliente pessoa)
        {
            _context.Add(pessoa);
            _context.SaveChanges();
            return Created("", pessoa);

        }
        [HttpPut("atualizar/{id}")]
        public IActionResult AtualizaPessoas(int id, Cliente pessoa)
        {
            var pessoaDoBanco = _context.Clientes.Find(id);
            if (pessoaDoBanco == null)
            {
                return NotFound("Pessoa não existe no banco!");
            }
            pessoaDoBanco.Nome = pessoa.Nome;
            pessoaDoBanco.Email = pessoa.Email;
            pessoaDoBanco.Senha = pessoa.Senha;
            _context.SaveChanges();
            return Ok("Atualizado");
        }
        [HttpDelete("deletar/{id}")]
        public IActionResult DeletePessoas(int id)
        {
            var pessoa = _context.Clientes.Find(id);

            if (pessoa == null)
                return NotFound("Pessoa não econtrada.");

            _context.Clientes.Remove(pessoa);
            _context.SaveChanges();

            return Ok("Deletado");
        }
    }
}
