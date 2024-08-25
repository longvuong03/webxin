using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
namespace WebApi.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Products>>> GetProducts(int page = 1)
        {
            const int pageSize = 10;
            var products = await _context.Product
                .OrderByDescending(p => p.id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return products;
        }
        [HttpPost]
        public async Task<ActionResult<Products>> AddProduct(Products products)
        {
            if (ModelState.IsValid)
            {

                _context.Product.Add(products);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetProducts), new { id = products.id }, products);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Products>> DeleteProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        [HttpGet]
        [Route("getbyidProduct/{id}")]
        public async Task<IActionResult> GetByIdUser(int id)
        {
            var user = await _context.Product.FindAsync(id);
            return Ok(user);
        }
        [HttpPost]
        [Route("editProduct")]
        public IActionResult Edit(Products product)
        {

            _context.Product.Update(product);
            _context.SaveChanges();
            return Ok(product);
        }


    }
}
