using WebApi.Data;
using WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Products>> GetProductsAsync()
        {
            return await _context.Product
                .OrderByDescending(p => p.id).ToListAsync();
        }

        public async Task AddProductAsync(Products product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<Products> GetProductByIdAsync(int? id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return null;
            }
            return product;
        }

        public async Task<Products> GetProductByNameAsync(string nameProduct)
        {
            return await _context.Product
                                 .FirstOrDefaultAsync(p => p.nameProduct == nameProduct);
        }

        public async Task UpdateProductAsync(Products product)
        {
            var existingProduct = await _context.Product.FindAsync(product.id);
            if (existingProduct != null)
            {
                existingProduct.img = product.img;
                existingProduct.nameProduct = product.nameProduct;
                existingProduct.price = product.price;

                _context.Product.Update(existingProduct);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                throw new ArgumentException("Product not found.");
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}
