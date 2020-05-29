using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses
{
    public class List
    {
        public class Query : IRequest<List<OutputTrainingClass>>
        {

        }
        public class Handler : IRequestHandler<Query, List<OutputTrainingClass>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<OutputTrainingClass>> Handle(Query request, CancellationToken cancellationToken)
            {
                var TrainingClasses = await _context.TrainingClasses.Include(x => x.UserTrainingClasses).Include("UserTrainingClasses.User").ToListAsync();
                return _mapper.Map<List<TrainingClass>, List<OutputTrainingClass>>(TrainingClasses);
            }
        }
    }
}