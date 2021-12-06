using System.Threading.Tasks;
using Application.DTO;
using Application.Photo;
using Application.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<OutputUser>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<OutputUser>> Register(Register.RegisterCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut]
        public async Task<ActionResult<OutputEditUser>> UpdateUser(EditUser.EditUserCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<OutputUser>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [HttpPost("upload-photo")]
        public async Task<ActionResult<PhotoUploadResult>> UploadPhoto([FromForm] AddPhoto.AddPhotoCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("photo/{UserName}")]
        public async Task<ActionResult<PhotoUploadResult>> RemovePhoto(string UserName)
        {
            return await Mediator.Send(new DeletePhoto.Command { UserName = UserName });
        }

    }
}