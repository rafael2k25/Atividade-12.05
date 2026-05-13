using Microsoft.EntityFrameworkCore;
using ATV.Models;
using static ATV.Models.Tarefa;
namespace ATV.Data
{
    public class ClienteDBContext : DbContext
    {
        public ClienteDBContext(DbContextOptions<ClienteDBContext> options)
            : base(options) { }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }
    }
}
