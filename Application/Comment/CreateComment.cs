using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Comment
{
    public class CreateComment
    {
        public class Command : IRequest<OutputComment>
        {
            public string Body { get; set; }

            public Guid TrainingClassesId { get; set; }

            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, OutputComment>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<OutputComment> Handle(Command request, CancellationToken cancellationToken)
            {
                var tc = await _context.TrainingClasses.Include(x => x.Comments).FirstOrDefaultAsync(x => x.Id == request.TrainingClassesId);
                if (tc == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { TrainingClasses = "Not found" });

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.Username);
                if (user == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { users = "Not found" });

                var comment = new Domain.Comment
                {
                    Author = user,
                    TrainingClass = tc,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };
                tc.Comments.Add(comment);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<OutputComment>(comment);

                throw new Exception("Problem saving changes");
            }
        }
    }
}