using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Interfaces;
using MediatR;

namespace Application.UserProfile {
    public class GetProfile {
        public class Query : IRequest<OutputUserProfile> {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, OutputUserProfile> {
            private readonly IProfileReader _profileReader;
            public Handler (IProfileReader profileReader) {
                _profileReader = profileReader;
            }

            public async Task<OutputUserProfile> Handle (Query request, CancellationToken cancellationToken) {
                return await _profileReader.ReadProfile (request.Username);
            }
        }
    }
}