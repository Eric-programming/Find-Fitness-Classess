using API.Middleware;
using Application.TrainingClasses;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistance;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<DataContext>(optionsAction =>
            {
                optionsAction.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            // services.AddCors(options =>
            // {
            //     options.AddPolicy(name: MyAllowSpecificOrigins,
            //         builder =>
            //         {
            //             builder.WithOrigins("http://localhost:3000").AllowAnyHeader()
            //                 .AllowAnyMethod();
            //         });
            // });
            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                                    .AllowAnyMethod()
                                                                     .AllowAnyHeader()));

            services.AddMediatR(typeof(List.Handler).Assembly);//Just one handler is good

            var builder = services.AddIdentityCore<User>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<User>>();

            services.AddAuthentication();

            // services.AddAutoMapper(typeof(List.Handler));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }
            // app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors("AllowAll");
            // app.UseCors (MyAllowSpecificOrigins);
            // app.UseCors (x => x.AllowAnyOrigin ().AllowAnyHeader ().AllowAnyMethod ());
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}