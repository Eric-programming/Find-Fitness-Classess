using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var trainingClass = await _context.TrainingClasses.FindAsync(request.Id);

                if (trainingClass == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { TrainingClasses = "Not found" });

                _context.Remove(trainingClass);

                if (await _context.SaveChangesAsync() > 0) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}