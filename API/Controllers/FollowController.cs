using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTO;
using Application.Followings;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static Application.Followings.ListingFollows;

namespace API.Controllers {
    // [Route ("api/follow")]
    public class FollowController : BaseController {
        [HttpPost ("{username}")]
        public async Task<ActionResult<Unit>> Follow (string username) {
            return await Mediator.Send (new AddFollowing.Command { Username = username });
        }

        [HttpDelete ("{username}")]
        public async Task<ActionResult<Unit>> Unfollow (string username) {
            return await Mediator.Send (new DeleteFollowing.Command { Username = username });
        }

        [HttpGet ("{username}/{isFollower}")]
        public async Task<ActionResult<List<OutputUserProfile>>> GetFollowings (string username, bool isFollower) {
            return await Mediator.Send (new List.Query { Username = username, Predicate = isFollower ? "followers" : "following" });
        }
    }
}