using System;
using System.Threading;
using System.Threading.Tasks;
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
                var activity = await _context.TrainingClasses.FindAsync(request.Id);

                if (activity == null)
                    throw new Exception("Not Found");

                _context.Remove(activity);

                if (await _context.SaveChangesAsync() > 0) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}