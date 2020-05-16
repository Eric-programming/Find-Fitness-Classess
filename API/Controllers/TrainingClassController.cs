using System;
using System.Collections.Generic;
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
        public async Task<ActionResult<List<TrainingClass>>> GetTrainingClassess()
        {
            var trainingclasses = await _mediator.Send(new List.Query());

            return Ok(trainingclasses);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TrainingClass>> GetTrainingClass(Guid id)
        {
            var trainingclass = await _mediator.Send(new ListDetail.Query { Id = id });
            if (trainingclass == null)
                return NotFound();
            return Ok(trainingclass);
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> CreateTrainingClass(Create.Command command)
        {
            return await _mediator.Send(command);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditTrainingClass(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteTrainingClass(Guid id)
        {

            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}