using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses {
    public class List {
        public class TrainingClassEnvelope {
            public List<OutputTrainingClass> TrainingClasses { get; set; }
            public int TotalCount { get; set; }
        }
        public class Query : IRequest<TrainingClassEnvelope> {
            public Query (int? skip, int? take) {
                Skip = skip;
                Take = take;
            }
            public int? Skip { get; set; }
            public int? Take { get; set; }
        }
        public class Handler : IRequestHandler<Query, TrainingClassEnvelope> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<TrainingClassEnvelope> Handle (Query request, CancellationToken cancellationToken) {
                var queryable = _context.TrainingClasses.Include (x => x.UserTrainingClasses).Include ("UserTrainingClasses.User").AsQueryable ();
                var tc = await queryable.Skip (request.Skip?? 0).Take (request.Take ?? 3).ToListAsync ();
                return new TrainingClassEnvelope {
                    TrainingClasses = _mapper.Map<List<TrainingClass>, List<OutputTrainingClass>> (tc),
                        TotalCount = queryable.Count ()
                };
            }
        }
    }
}