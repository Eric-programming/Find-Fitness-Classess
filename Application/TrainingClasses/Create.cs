using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses {
    public class Create {

        public class Command : IRequest {
            [Required]
            public Guid Id { get; set; }

            [Required]
            public string Title { get; set; }

            [Required]
            [StringLength (80)]
            public string Description { get; set; }

            [Required]
            public string Category { get; set; }

            [RegularExpression (@"^([0-1][0-9]|[0-9]):([0-5][0-9])$",
                ErrorMessage = "Time must be xx:xx time format. Ex. 12:00")]
            [Required]
            public string Time { get; set; }

            [Required]
            public int DayOfWeek { get; set; }

            [Required]
            public string City { get; set; }

            [Required]
            public string Address { get; set; }

            [Required]
            public string Country { get; set; }

            [Required]
            public string PostalCode { get; set; }

            [Required]
            public string Province { get; set; }

            [Required]
            public int TotalSpots { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler (DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {

                var user = await _context.Users.FirstOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());
                if (user == null) {
                    throw new ErrorException (HttpStatusCode.Unauthorized);
                }

                var TrainingClass = new TrainingClass {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Time = request.Time,
                    DayOfWeek = request.DayOfWeek,
                    City = request.City,
                    Address = request.Address,
                    Country = request.Country,
                    PostalCode = request.PostalCode,
                    Province = request.Province,
                    TotalSpots = request.TotalSpots
                };
                if (request.Id != null) {
                    var trainingClass = await _context.TrainingClasses.FindAsync (request.Id);
                    if (trainingClass != null)
                        TrainingClass.Id = Guid.NewGuid ();
                }

                _context.TrainingClasses.Add (TrainingClass);
                _context.UserTrainingClasses.Add (new UserTrainingClass {
                    User = user,
                        TrainingClass = TrainingClass,
                        DateJoined = DateTime.Now,
                        IsHost = true
                });
                if (await _context.SaveChangesAsync () > 0)
                    return Unit.Value;

                throw new Exception ("Problem saving changes");

            }
        }
    }
}