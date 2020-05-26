using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<OutputUser>
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
            [Required]
            public string FullName { get; set; }
            [Required]
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, OutputUser>
        {
            private readonly DataContext _context;
            private readonly UserManager<Domain.User> _userManager;
            private readonly IJWTGen _jwtGenerator;
            public Handler(DataContext context, UserManager<Domain.User> userManager, IJWTGen jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _context = context;
            }

            public async Task<OutputUser> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email.ToLower() == request.Email.ToLower()).AnyAsync())
                    throw new ErrorException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await _context.Users.Where(x => x.UserName.ToLower() == request.Username.ToLower()).AnyAsync())
                    throw new ErrorException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });

                var user = new Domain.User
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    UserName = request.Username
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return new OutputUser
                    {
                        fullName = user.FullName,
                        token = _jwtGenerator.CreateToken(user),
                        userName = user.UserName,
                        image = "Nope"
                    };
                }

                throw new Exception("Problem creating user");
            }
        }
    }
}