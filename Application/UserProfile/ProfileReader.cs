using System.Linq;
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
            var user = await _context.Users.FirstOrDefaultAsync (x => x.UserName == username); //he or she

            if (user == null)
                throw new ErrorException (HttpStatusCode.NotFound, new { User = "Not found" });

            var currentUser = await _context.Users.SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ()); //me
            //isFollow means 
            var isFollowed = await _context.Followings.FirstOrDefaultAsync (x => x.Observer.UserName == currentUser.UserName && x.Target.UserName == user.UserName);
            var followMe = await _context.Followings.FirstOrDefaultAsync (x => x.Target.UserName == currentUser.UserName && x.Observer.UserName == user.UserName);
            var followers = await _context.Followings.Where (x => x.Target.UserName == user.UserName).ToListAsync ();
            var followings = await _context.Followings.Where (x => x.Observer.UserName == user.UserName).ToListAsync ();

            var profile = new OutputUserProfile {
                FullName = user.FullName,
                Username = user.UserName,
                Image = user.photoUrl,
                Bio = user.Bio,
                isFollowed = isFollowed != null,
                FollowersCount = followers.Count,
                FollowingCount = followings.Count
            };

            return profile;
        }
    }
}