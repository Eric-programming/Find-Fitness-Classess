using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistance;
using Microsoft.EntityFrameworkCore;

namespace Application.TrainingClasses
{
    public class List
    {
        public class Query : IRequest<List<TrainingClass>>
        {

        }
        public class Handler : IRequestHandler<Query, List<TrainingClass>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<TrainingClass>> Handle(Query request, CancellationToken cancellationToken)
            {
                var TrainingClasses = await _context.TrainingClasses.ToListAsync();
                return TrainingClasses;
            }
        }
    }
}