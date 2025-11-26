using HotelManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly Models.ApplicationDbContext _context;
        public CustomerController(Models.ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCutomer()
        {

            List<Models.Customers> cutomers = _context.Customers.ToList();

            return Ok(cutomers);
        }

        [HttpPost]
        public IActionResult AddCustomer(Customers customers)
        {
            _context.Customers.Add(customers);
            return Ok(_context.SaveChanges());
        }

        [HttpGet("{id}")]
        public ActionResult<Customers> GetCustomerById(int id)
        {
            var customer = _context.Customers.Find(id);
            return customer;
        }

        [HttpPost("{id}")]
        public IActionResult EditCustomer(int id, Customers customer)
        {
          
            var cust = _context.Customers.Find(id);


            if (cust == null)
                return NotFound("Customer not found");

            cust.Name = customer.Name;
            cust.Email = customer.Email;
            cust.Phone = customer.Phone;

            _context.Customers.Update(cust);
            _context.SaveChanges();

            return Ok("Customer updated successfully");
        }

        [HttpDelete("{id}")]

        public IActionResult DeleteCustomer(int id)
        {
            var customer = _context.Customers.Find(id);
            _context.Customers.Remove(customer);
            _context.SaveChanges();

            return Ok("Customer Deleted Successfully");
        }

    }
}
