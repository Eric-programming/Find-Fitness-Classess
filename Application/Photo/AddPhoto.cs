using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Photo {
    public class AddPhoto {
        public class Command : IRequest<PhotoUploadResult> {
            public IFormFile File { get; set; }
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
                var user = await _context.Users.FirstOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());
                if (user == null)
                    throw new ErrorException (HttpStatusCode.NotFound, new { User = "Not found" });

                var photoUploadResult = _photoAccessor.AddPhoto (request.File);
                if (user.photoId != null) {
                    if (_photoAccessor.DeletePhoto (user.photoId) == "ok") {
                        System.Console.WriteLine ("Profile Image is deleted");
                    } else {
                        System.Console.WriteLine ("Fail Destroy Profile Image");
                    }
                }
                user.photoUrl = photoUploadResult.Url;
                user.photoId = photoUploadResult.PublicId;
                var success = await _context.SaveChangesAsync () > 0;

                if (success) return photoUploadResult;

                throw new Exception ("Problem saving changes");
            }
        }
    }
}