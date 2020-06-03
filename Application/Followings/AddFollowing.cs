using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Followings {
    public class AddFollowing {
        public class Command : IRequest {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler (DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var observer = await _context.Users.FirstOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());
                if (observer.UserName == request.Username)
                    throw new ErrorException (HttpStatusCode.NotFound, new { User = "Can't follow yourself" });
                var target = await _context.Users.FirstOrDefaultAsync (x => x.UserName == request.Username);
                if (target == null)
                    throw new ErrorException (HttpStatusCode.NotFound, new { User = "Not found" });

                var following = await _context.Followings.FirstOrDefaultAsync (x => x.ObserverId == observer.Id && x.TargetId == target.Id);

                if (following != null)
                    throw new ErrorException (HttpStatusCode.BadRequest, new { User = "You are already following this user" });

                if (following == null) {
                    following = new UserFollowing {
                    Observer = observer,
                    Target = target
                    };

                    _context.Followings.Add (following);
                }

                var success = await _context.SaveChangesAsync () > 0;

                if (success) return Unit.Value;

                throw new Exception ("Problem saving changes");
            }
        }
    }
}