using HotelManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBookings()
        {
            List<Bookings> bookings = _context.Bookings.Include(b => b.Customer).Include(b => b.Room).ToList();
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookingById(int id)
        {
            var booking = _context.Bookings.Include(b => b.Customer).Include(b => b.Room).FirstOrDefault(b => b.BookingId == id);
            return Ok(booking);
        }

        [HttpPost]
        public IActionResult AddBooking(Bookings booking)
        {
            // 1. Check if room exists
            var room = _context.Rooms.Find(booking.RoomId);
            if (room == null)
                return BadRequest("Room does not exist.");

            // 2. Check double booking
            bool isBooked = _context.Bookings.Any(b =>
                b.RoomId == booking.RoomId &&
                b.Status == "Active" &&
                booking.CheckInDate < b.CheckOutDate &&
                booking.CheckOutDate > b.CheckInDate
            );

            if (isBooked)
                return BadRequest("Room is already booked.");

            // 3. Save booking
            booking.Status = "Active";
            _context.Bookings.Add(booking);

            // 4. Update room status
            room.Status = "Booked";

            _context.SaveChanges();

            return Ok("Booking created successfully");
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteBooking(int id)
        {
            var booking = _context.Bookings.Find(id);

            if (booking == null)
            {
                return BadRequest("Booking Not Found");
            }

            booking.Status = "Cancelled";

            var room = _context.Rooms.Find(booking.BookingId);
            if (room != null)
            {
                room.Status = "Available";
            }

            _context.SaveChanges();

            return Ok("Booking cancelled and room is now available");
        }
    }
}
