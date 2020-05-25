using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
//dotnet  ef migrations add initialCreate -p Persistance/ -s API/
namespace Persistance {
    public class DataContext : IdentityDbContext<User> {
        public DataContext (DbContextOptions options) : base (options) {

        }
        public DbSet<Values> Values { get; set; }
        public DbSet<TrainingClass> TrainingClasses { get; set; }

        protected override void OnModelCreating (ModelBuilder builder) {
            base.OnModelCreating (builder); //Add a primary key for the User Data Model
            builder.Entity<Values> ()
                .HasData (
                    new Values { Id = 1, Name = "Value 1" },
                    new Values { Id = 2, Name = "Value 2" },
                    new Values { Id = 3, Name = "Value 3" }
                );
        }
    }
}