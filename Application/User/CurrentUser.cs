using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<OutputUser> { }

        public class Handler : IRequestHandler<Query, OutputUser>
        {
            private readonly UserManager<Domain.User> _userManager;
            private readonly IJWTGen _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<Domain.User> userManager, IJWTGen jwtGenerator, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<OutputUser> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                return new OutputUser
                {
                    fullName = user.FullName,
                    userName = user.UserName,
                    token = _jwtGenerator.CreateToken(user),
                    image = user.photoUrl
                };
            }
        }
    }
}