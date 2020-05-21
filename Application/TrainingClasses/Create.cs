using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
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

            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
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
                _context.TrainingClasses.Add (TrainingClass);

                if (await _context.SaveChangesAsync () > 0)
                    return Unit.Value;

                throw new Exception ("Problem saving changes");

            }
        }
    }
}