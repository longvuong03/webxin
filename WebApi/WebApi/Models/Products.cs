using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Products
    {
        [Key]
        public int id { get; set; }
        public string? img { get; set; }
        public string? nameProduct { get; set; }
        public int? quantity { get; set; }
        public int? price { get; set; }
        public ICollection<CartDetail>? CartDetails { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }

    }
}
