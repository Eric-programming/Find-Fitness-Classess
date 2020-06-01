using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;

namespace Application.UserProfile
{
    public class GetProfile
    {
        public class Query : IRequest<ProfileModel>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProfileModel>
        {
            private readonly IProfileReader _profileReader;
            public Handler(IProfileReader profileReader)
            {
                _profileReader = profileReader;
            }

            public async Task<ProfileModel> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _profileReader.ReadProfile(request.Username);
            }
        }
    }
}