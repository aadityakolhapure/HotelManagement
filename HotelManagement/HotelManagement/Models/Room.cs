using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoomId { get; set; }
        public string RoomNumber { get; set; }
        public string Type { get; set; }
        [Precision(18, 2)]
        public decimal Price { get; set; }
        public string Status { get; set; } = "Available";
    }
}
