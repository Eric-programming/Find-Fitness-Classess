using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<OutputUser>
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Query, OutputUser>
        {
            private readonly UserManager<Domain.User> _userManager;
            private readonly IJWTGen _jwtGen;
            // private readonly SignInManager<Domain.User> _signInManager;
            public Handler(UserManager<Domain.User> userManager, IJWTGen jWTGen)
            {
                _jwtGen = jWTGen;
                // _signInManager = signInManager;
                _userManager = userManager;
            }

            public async Task<OutputUser> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new ErrorException(HttpStatusCode.Unauthorized);
                var result = await _userManager.CheckPasswordAsync(user, request.Password);


                if (result)
                {
                    // TODO: generate token
                    return new OutputUser
                    {
                        fullName = user.FullName,
                        token = _jwtGen.CreateToken(user),
                        userName = user.UserName,
                        image = "user Image"
                    };
                }

                throw new ErrorException(HttpStatusCode.Unauthorized);
            }
        }
    }
}