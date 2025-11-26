using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class Bookings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }

        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        //I used Chatgpt here and make it nullable
        public Customers? Customer { get; set; }

        public int RoomId { get; set; }
        [ForeignKey("RoomId")]

//I used Chatgpt here and make it nullable
        public Room? Room { get; set; }

        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }

        public string Status { get; set; } = "Active";
    }
}
