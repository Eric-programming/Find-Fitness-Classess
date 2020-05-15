using System.Threading.Tasks;
using Application.TrainingClasses;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingClassController : ControllerBase
    //Use ControllerBase if no view
    {
        private readonly IMediator _mediator;


        public TrainingClassController(IMediator mediator)
        {
            _mediator = mediator;

        }
        // GET api/trainingclass
        [HttpGet]
        public async Task<ActionResult<TrainingClass>> GetTrainingClassess()
        {
            var trainingclass = await _mediator.Send(new List.Query());

            return Ok(trainingclass);
        }
    }
}