using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
    public class ValuesController : ControllerBase
    {
        // private readonly DataContext _context;
        // public ValuesController(DataContext context)
        // {
        //     _context = context;
        // }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetValues()
        {
            return new string[] {"1", "two"};
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}