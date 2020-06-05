using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTO;
using Application.Profiles;
using Application.UserProfile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    [Authorize]
    public class ProfileController : BaseController {
        [HttpGet ("{UserName}")]
        public async Task<ActionResult<OutputUserProfile>> GetProfile (string UserName) {

            return await Mediator.Send (new GetProfile.Query { Username = UserName });
        }

        [HttpGet ("{username}/trainingclass")]
        public async Task<ActionResult<List<OutputProfileTrainingClassess>>> GetUserTrainingClassess (string username, bool isHost) {

            return await Mediator.Send (new ListTrainingClassess.Query { Username = username, isHost = isHost });
        }
    }
}