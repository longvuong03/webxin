using WebApi.Models.DTO;

namespace WebApi.Models
{
    public class Modeldata
    {
        public CartDetail CartDetail { get; set; }
        public Products Products { get; set; }
        public Order Order { get; set; }
        public OrderDetail OrderDetail { get; set; }


        public OrderDetailDTO orderDetailDTO { get; set; }
        public ProductDTO ProductDto { get; set; }
        public OrderDTO OrderDTO { get; set; }
    }
}
