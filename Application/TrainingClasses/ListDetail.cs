using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses
{
    public class ListDetail
    {

        public class Query : IRequest<TrainingClass>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, TrainingClass>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<TrainingClass> Handle(Query request, CancellationToken cancellationToken)
            {
                var TrainingClass = await _context.TrainingClasses.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (TrainingClass == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { TrainingClasses = "Not found" });
                return TrainingClass;
            }
        }
    }
}