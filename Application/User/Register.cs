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
            [DataType(DataType.Password)]
            [RegularExpression("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$", ErrorMessage = "Passwords must be at least 8 characters and contain at 3 of 4 of the following: upper case (A-Z), lower case (a-z), number (0-9) and special character (e.g. !@#$%^&*)")]

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