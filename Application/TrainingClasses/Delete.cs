using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var trainingClass = await _context.TrainingClasses.FindAsync(request.Id);

                if (trainingClass == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { TrainingClasses = "Not found" });

                //check user is the host
                var checkUserIsHost = await _context.UserTrainingClasses.FirstOrDefaultAsync(x => x.User.UserName == _userAccessor.GetCurrentUsername() && x.TrainingClassId == trainingClass.Id && x.IsHost == true);
                if (checkUserIsHost == null)
                    throw new ErrorException(HttpStatusCode.Unauthorized, new { TrainingClasses = "You are not the host" });
                _context.Remove(trainingClass);

                if (await _context.SaveChangesAsync() > 0) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}