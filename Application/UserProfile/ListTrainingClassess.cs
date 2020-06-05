using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using Application.TrainingClasses;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class ListTrainingClassess
    {
        public class Query : IRequest<List<OutputProfileTrainingClassess>>
        {
            public string Username { get; set; }
            public bool isHost { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<OutputProfileTrainingClassess>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<OutputProfileTrainingClassess>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = _context.UserTrainingClasses.Include(x => x.User).Include(x => x.TrainingClass)
                    .Where(x => x.User.UserName == user.UserName)
                    .OrderBy(a => a.TrainingClass.Time)
                    .AsQueryable();
                if (request.isHost)
                {
                    queryable = queryable.Where(a => a.IsHost);
                }
                else
                {
                    queryable = queryable.Where(a => !a.IsHost);
                }

                var TrainingClassess = queryable.ToList();
                var TrainingClassessToReturn = new List<OutputProfileTrainingClassess>();

                foreach (var item in TrainingClassess)
                {
                    var tc = new OutputProfileTrainingClassess
                    {
                        Id = item.TrainingClass.Id,
                        Title = item.TrainingClass.Title,
                        Category = item.TrainingClass.Category,
                        Time = TimeConverter.MinsToTime(item.TrainingClass.Time),
                        dayOfWeek = item.TrainingClass.DayOfWeek
                    };

                    TrainingClassessToReturn.Add(tc);
                }

                return TrainingClassessToReturn;
            }
        }
    }
}