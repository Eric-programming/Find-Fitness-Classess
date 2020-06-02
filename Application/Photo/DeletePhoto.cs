using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Photo {
    public class DeletePhoto {
        public class Command : IRequest<PhotoUploadResult> {
            [Required]
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Command, PhotoUploadResult> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler (DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor) {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<PhotoUploadResult> Handle (Command request, CancellationToken cancellationToken) {
                var userName = _userAccessor.GetCurrentUsername ();
                if (userName != request.UserName)
                    throw new ErrorException (HttpStatusCode.Unauthorized);
                var user = await _context.Users.FirstOrDefaultAsync (x => x.UserName == userName);
                if (user == null)
                    throw new ErrorException (HttpStatusCode.NotFound, new { User = "Not found" });
                if (user.photoId == null)
                    throw new ErrorException (HttpStatusCode.NotFound, new { User = "Photo is already removed" });
                if (_photoAccessor.DeletePhoto (user.photoId) == "ok") {
                    System.Console.WriteLine ("Profile Image is deleted");
                    user.photoUrl = null;
                    user.photoId = null;
                }
                var success = await _context.SaveChangesAsync () > 0;
                if (success) return new PhotoUploadResult {
                    PublicId = user.photoId,
                        Url = user.photoUrl
                };
                throw new Exception ("Problem saving changes");
            }
        }
    }
}