using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Models.DTO;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly CartDetailsService _cartDetailsService;
        private readonly CartService _cartService;
        private readonly OrderService _orderService;
        private readonly OrderDetailsService _orderDetailsService;
        private readonly ProductService _productService;

        public OrderController(CartDetailsService cartDetailsService, CartService cartService, OrderService orderService, OrderDetailsService orderDetailsService, ProductService productService)
        {
            _cartDetailsService = cartDetailsService;
            _cartService = cartService;
            _orderService = orderService;
            _orderDetailsService = orderDetailsService;
            _productService = productService;
        }
        [HttpGet("AddOrder")]
        public async Task<IActionResult> AddOrder(int UserId)
        {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.UserId = UserId;
            orderDTO.OrderDate = DateTime.Now;
            orderDTO.TotalAmount = 0;
            int idorder = await _orderService.AddOrderAsync(orderDTO);
            Cart cart = await _cartService.GetCartByUserIdAsync(UserId);
            List<CartDetail> cartDetails = await _cartDetailsService.GetListCartDetailsAsync(cart.Id);

            foreach (var item in cartDetails)
            {
                item.Product = null;
                item.Cart = null;
                OrderDetailDTO detailDTO = new OrderDetailDTO();    
                detailDTO.OrderId = idorder;
                detailDTO.ProductId = item.ProductId;
                detailDTO.Quantity = item.Quantity;
                detailDTO.TotalPrice = item.TotalPrice;
                await _orderDetailsService.AddOrderDetail(detailDTO);
                orderDTO.TotalAmount += item.TotalPrice.GetValueOrDefault();
            }
            await _orderService.UpdateOrderAsync(orderDTO);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            try
            {
                // Sử dụng CartService để xóa cart
                await _orderDetailsService.DeleteOrderDetailAsync(id); // Gọi phương thức xóa từ CartDetailsService
                return NoContent(); // Trả về mã trạng thái 204 No Content khi xóa thành công
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message); // Trả về mã trạng thái 404 Not Found nếu không tìm thấy mục để xóa
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Trả về mã trạng thái 500 Internal Server Error cho các lỗi khác
            }
        }
        [HttpGet("listorder")]
        public async Task<IActionResult> ListOrder(int userId)
        {
            // Lấy danh sách đơn hàng của người dùng
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);

            // Nếu không có đơn hàng, trả về danh sách rỗng
            if (orders == null || !orders.Any())
            {
                return Ok(new List<Modeldata>());
            }

            List<Modeldata> modeldatas = new List<Modeldata>();

            foreach (var order in orders)
            {
                // Lấy chi tiết đơn hàng
                var orderDetails = await _orderDetailsService.GetOrderDetailsByOrderIdAsync(order.Id);

                foreach (var item in orderDetails)
                {
                    // Lấy thông tin sản phẩm
                        Products product = await _productService.GetProductByIdAsync(item.ProductId);
                    product.OrderDetails = null;
                // Khởi tạo đối tượng Modeldata
                var modeldata = new Modeldata()
                    {
                        OrderDetail = item,
                        Products = product
                    };
                    item.Product = null;
                    item.Order = null;
                    modeldatas.Add(modeldata);
                }
            }

            return Ok(modeldatas);
        }


    }
}
