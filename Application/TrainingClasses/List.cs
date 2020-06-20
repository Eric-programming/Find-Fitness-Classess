using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses
{
    public class List
    {
        public class TrainingClassEnvelope
        {
            public List<OutputTrainingClass> TrainingClasses { get; set; }
            public int TotalCount { get; set; }
        }
        public class Query : IRequest<TrainingClassEnvelope>
        {

            public Query(OutputTrainingClassessQueryParams p)
            {
                StartTime = p.StartTime == null ? 0 : TimeConverter.TimeToMins(p.StartTime);
                IsHost = p.isHost;
                IsGoing = p.isGoing;
                Skip = p.skip;
                Take = p.take;
            }
            public int? Skip { get; set; }
            public int? Take { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public int StartTime { get; set; }
        }
        public class Handler : IRequestHandler<Query, TrainingClassEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }
            public async Task<TrainingClassEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                if (TimeConverter.InvalidTime(request.StartTime))
                {
                    throw new ErrorException(HttpStatusCode.BadRequest, new { TrainingClasses = "Invalid Time" });
                }
                var queryable = _context.TrainingClasses.Include(x => x.UserTrainingClasses).Include("UserTrainingClasses.User")
                    .OrderBy(x => x.Time).AsQueryable();
                var userName = _userAccessor.GetCurrentUsername();
                if (request.StartTime != 0)
                {
                    queryable = queryable.Where(x => x.Time >= request.StartTime);
                }
                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where(x => x.UserTrainingClasses.Any(y => y.User.UserName == userName && y.IsHost == false));
                }
                if (!request.IsGoing && request.IsHost)
                {
                    queryable = queryable.Where(x => x.UserTrainingClasses.Any(y => y.User.UserName == userName && y.IsHost));
                }
                var tc = await queryable.Skip(request.Skip ?? 0).Take(request.Take ?? 3).ToListAsync();
                return new TrainingClassEnvelope
                {
                    TrainingClasses = _mapper.Map<List<TrainingClass>, List<OutputTrainingClass>>(tc),
                    TotalCount = queryable.Count()
                };
            }
        }
    }
}