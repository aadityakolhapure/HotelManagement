using HotelManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetRooms()
        {
            List<Room> rooms = _context.Rooms.ToList();
            return Ok(rooms);
        }
        [HttpPost]
        public IActionResult AddRoom(Room room)
        {
            _context.Rooms.Add(room);
            return Ok(_context.SaveChanges());
        }

        [HttpGet("{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = _context.Rooms.Find(id);
            return Ok(room);
        }

        [HttpPost("{id}")]
        public IActionResult EditRoom(int id, Room room)
        {
            var r1 = _context.Rooms.Find(id);
            r1.RoomNumber = room.RoomNumber;
            r1.Type = room.Type;
            r1.Price = room.Price;
            r1.Status = room.Status;

            _context.Rooms.Update(r1);

            return Ok(_context.SaveChanges());
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRoom(int id)
        {
            var room = _context.Rooms.Find(id);

            _context.Rooms.Remove(room);

            return Ok(_context.SaveChanges());
        }
    }
}
