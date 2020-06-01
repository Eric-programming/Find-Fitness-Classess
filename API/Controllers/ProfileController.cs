using System.Threading.Tasks;
using Application.UserProfile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ProfileController : BaseController
    {
        [HttpGet("{UserName}")]
        public async Task<ActionResult<ProfileModel>> GetProfile(string UserName)
        {

            return await Mediator.Send(new GetProfile.Query { Username = UserName });
        }
    }
}