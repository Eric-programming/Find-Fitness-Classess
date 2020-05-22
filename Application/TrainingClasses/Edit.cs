using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.TrainingClasses
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            [StringLength(80)]
            public string Description { get; set; }
            public string Category { get; set; }
            public string Time { get; set; }
            [Range(0, 6,
            ErrorMessage = "Day of the week for {0} must be between {1} and {2}.")]
            public int? DayOfWeek { get; set; }
            public string City { get; set; }
            public string Address { get; set; }
            public string Country { get; set; }
            public string PostalCode { get; set; }
            public string Province { get; set; }
            public int? TotalSpots { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var TrainingClass = await _context.TrainingClasses.FirstOrDefaultAsync(x => x.Id == request.Id);
                if (TrainingClass == null)
                    throw new ErrorException(HttpStatusCode.NotFound, new { TrainingClasses = "Not found" });
                TrainingClass.Title = request.Title ?? TrainingClass.Title;
                TrainingClass.Category = request.Category ?? TrainingClass.Category;
                TrainingClass.Description = request.Description ?? TrainingClass.Description;
                TrainingClass.Time = request.Time ?? TrainingClass.Time;
                TrainingClass.DayOfWeek = request.DayOfWeek ?? TrainingClass.DayOfWeek;
                TrainingClass.City = request.City ?? TrainingClass.City;
                TrainingClass.Address = request.Address ?? TrainingClass.Address;
                TrainingClass.Country = request.Country ?? TrainingClass.Country;
                TrainingClass.PostalCode = request.PostalCode ?? TrainingClass.PostalCode;
                TrainingClass.TotalSpots = request.TotalSpots ?? TrainingClass.TotalSpots;

                if (await _context.SaveChangesAsync() > 0) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}