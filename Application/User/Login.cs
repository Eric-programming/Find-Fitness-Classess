using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<Domain.User>
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.User>
        {
            private readonly UserManager<Domain.User> _userManager;
            // private readonly SignInManager<Domain.User> _signInManager;
            public Handler(UserManager<Domain.User> userManager)
            {
                // _signInManager = signInManager;
                _userManager = userManager;
            }

            public async Task<Domain.User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new ErrorException(HttpStatusCode.Unauthorized);
                var result = await _userManager.CheckPasswordAsync(user, request.Password);


                if (result)
                {
                    // TODO: generate token
                    return user;
                }

                throw new ErrorException(HttpStatusCode.Unauthorized);
            }
        }
    }
}