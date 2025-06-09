using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces.Ticket;
using Application.DTOs.Ticket;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ticketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public ticketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] CreateTicketRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _ticketService.CreateTicketAsync(request);
            return Ok(result);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> CreateTickets([FromBody] CreateTicketsRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _ticketService.CreateTicketsAsync(request);
            return Ok(result);
        }

        [HttpGet("ticket/{userId}")]
        public async Task<IActionResult> GetTicketsByUserId(string userId)
        {
            var result = await _ticketService.GetTicketsByUserIdAsync(userId);
            return Ok(result);
        }



    }
}
