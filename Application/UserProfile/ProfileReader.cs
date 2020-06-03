using System.Net;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.UserProfile {
    public class ProfileReader : IProfileReader {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public ProfileReader (DataContext context, IUserAccessor userAccessor) {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<OutputUserProfile> ReadProfile (string username) {
            var user = await _context.Users.FirstOrDefaultAsync (x => x.UserName == username);

            if (user == null)
                throw new ErrorException (HttpStatusCode.NotFound, new { User = "Not found" });

            var currentUser = await _context.Users.SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());

            var profile = new OutputUserProfile {
                FullName = user.FullName,
                Username = user.UserName,
                Image = user.photoUrl,
                Bio = user.Bio,
            };

            return profile;
        }
    }
}