using System.Linq;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses
{
    public class ListDetail
    {

        public class Query : IRequest<OutputTrainingClass>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, OutputTrainingClass>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<OutputTrainingClass> Handle(Query request, CancellationToken cancellationToken)
            {
                var TrainingClass = await _context.TrainingClasses.Include(x => x.UserTrainingClasses).Include("UserTrainingClasses.User").FirstOrDefaultAsync(x => x.Id == request.Id);

                if (TrainingClass == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { TrainingClasses = "Not found" });
                return _mapper.Map<TrainingClass, OutputTrainingClass>(TrainingClass);
            }
        }
    }
}