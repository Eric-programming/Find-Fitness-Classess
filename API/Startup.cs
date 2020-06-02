using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.TrainingClasses;
using Application.UserProfile;
using API.Middleware;
using API.SignalR;
using AutoMapper;
using Domain;
using infrastructure.Photo;
using infrastructure.Security;
using Infrastructure.Photo;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistance;

namespace API {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddControllers ();
            services.AddDbContext<DataContext> (optionsAction => {
                optionsAction.UseSqlite (Configuration.GetConnectionString ("DefaultConnection"));
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
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder => {
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins("http://localhost:3000");
            }));

            services.AddMediatR (typeof (List.Handler).Assembly); //Just one handler is good
            services.AddAutoMapper (typeof (List.Handler).Assembly); //It will take a look at the application folder
            var builder = services.AddIdentityCore<User> ();
            var identityBuilder = new IdentityBuilder (builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext> ();
            identityBuilder.AddSignInManager<SignInManager<User>> ();
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (Configuration["TokenKey"]));
            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme).AddJwtBearer (opt => {
                opt.TokenValidationParameters = new TokenValidationParameters {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateAudience = false,
                ValidateIssuer = false
                };
                opt.Events = new JwtBearerEvents {
                    OnMessageReceived = context => {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        //Chat Hub
                        if (!string.IsNullOrEmpty (accessToken) && (path.StartsWithSegments ("/chat"))) {
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            });

            services.AddScoped<IJWTGen, JWTGen> (); //Injectiable
            services.AddScoped<IUserAccessor, UserAccessor> (); //Injectiable
            services.AddScoped<IPhotoAccessor, PhotoAccessor> ();
            services.AddScoped<IProfileReader, ProfileReader> ();
            //Signal R ⬇️
            services.AddSignalR ();
            //Signal R⬆️
            //Cloudary ⬇️
            services.Configure<CloudinarySetting> (Configuration.GetSection ("CloudinarySettings"));
            //Cloundary⬆️
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseMiddleware<ErrorHandlingMiddleware> ();
            if (env.IsDevelopment ()) {
                // app.UseDeveloperExceptionPage();
            }
            // app.UseHttpsRedirection();
            app.UseRouting ();
            app.UseCors("CorsPolicy");

            app.UseAuthentication ();
            app.UseAuthorization ();
            // app.UseCors (MyAllowSpecificOrigins);
            // app.UseCors (x => x.AllowAnyOrigin ().AllowAnyHeader ().AllowAnyMethod ());
            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
                //Signal R ⬇️
                endpoints.MapHub<ChatHub> ("/chat"); //Redirect this request to the chatHub
                //Signal R⬆️
            });
        }
    }
}
