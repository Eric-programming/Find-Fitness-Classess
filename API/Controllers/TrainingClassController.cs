using System;
using System.Threading.Tasks;
using Application.DTO;
using Application.TrainingClasses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Application.TrainingClasses.List;

namespace API.Controllers
{
    [Authorize]
    public class TrainingClassController : BaseController
    {
        // GET api/trainingclass
        [HttpGet]
        public async Task<ActionResult<TrainingClassEnvelope>> GetTrainingClassess([FromQuery] OutputTrainingClassessQueryParams p)
        {
            var trainingclasses = await Mediator.Send(new List.Query(p));
            return Ok(trainingclasses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OutputTrainingClass>> GetTrainingClass(Guid id)
        {
            var trainingclass = await Mediator.Send(new ListDetail.Query { Id = id });
            if (trainingclass == null)
                return NotFound();
            return Ok(trainingclass);
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateTrainingClass(Create.CreateCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditTrainingClass(Guid id, Edit.EditCommand command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteTrainingClass(Guid id)
        {

            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await Mediator.Send(new AddAttendee.Command { TrainingClassId = id });
        }

        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> Unattend(Guid id)
        {
            return await Mediator.Send(new RemoveAttendee.Command { TrainingClassId = id });
        }
    }
}