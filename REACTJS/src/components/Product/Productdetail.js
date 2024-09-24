import React, { useState, useEffect } from "react";
import DropDown from "react-bootstrap/Dropdown";
import Toast from "react-bootstrap/Toast";
import { useParams } from "react-router-dom";
import "../../asset/css/product_detai.css";
import { addCart } from "../../services/CartService";
import { fetchAllProduct, getbyidProduct } from "../../services/ProductService";
const Productdetail = () => {
  const { idproduct } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); // State cho quantity
  const [toasts, setToasts] = useState([]); // State cho danh sách Toasts

  useEffect(() => {
    fetchAllProduct();
    window.scrollTo(0, 0); // Cuộn về đầu trang khi load
    document.activeElement.blur(); // Bỏ focus khỏi các phần tử đang nhận focus
  }, [idproduct]);

  const fetchAllProduct = async () => {
    try {
      const res = await getbyidProduct(idproduct);
      setProduct(res);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleAddToCart = async (id) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const UserId = user.id;
    const ProductId = id;
    const response = await addCart(UserId, ProductId, quantity);
    console.log("Response from server:", response);

    // Thêm thông báo mới vào danh sách toasts
    setToasts([
      ...toasts,
      {
        id: new Date().getTime(), // Tạo ID duy nhất cho mỗi toast
        message: `Product added to cart successfully!`,
        productName: product.nameProduct,
        quantity: quantity,
        img: product.img,
      },
    ]);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value); // Cập nhật quantity khi người dùng thay đổi input
    }
  };

  return (
    <>
      <section id="common_banner_cart">
        <div className="container">
          <div className="col-lg-12">
            <div className="common_banner_cart_text">
              <h1 className="text-center text-white">CART</h1>
              <p className="text-center text_bread">Home / Product</p>
            </div>
          </div>
        </div>
      </section>
      <section className="content-product-detail">
        <div className="container mt-5">
          <div className="row">
            <div className="col-5">
              <img src={product.img} alt="Product" className="img-product" />
            </div>
            <div className="col">
              <h4>{product.nameProduct}</h4>
              <p className="my-3 text-warning">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </p>
              <h5 className="fw-bold my-3">$79</h5>
              <p>{product.description}</p>
              <DropDown>
                <DropDown.Toggle className="buttondropdown">
                  Size
                </DropDown.Toggle>
                <DropDown.Menu>
                  <DropDown.Item href="#/action-1">S</DropDown.Item>
                  <DropDown.Item href="#/action-2">M</DropDown.Item>
                  <DropDown.Item href="#/action-3">L</DropDown.Item>
                </DropDown.Menu>
              </DropDown>
              <div className="quantity mt-4 mb-4 fw-bold">
                <p>Quantity</p>
                <input
                  type="number"
                  className="text-center"
                  value={quantity} // Liên kết giá trị của ô input với state
                  onChange={handleQuantityChange} // Lắng nghe sự kiện onChange
                  style={{ width: "40px" }}
                />
              </div>
              <p className="mt-4 mb-4">
                <i className="bi bi-heart"></i> Add To Wishlist
              </p>
              <a
                onClick={() => handleAddToCart(product.id)}
                className="btn_shopnow">
                Add To Cart
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hiển thị danh sách Toasts */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
            delay={3000}
            autohide
            className="mb-2"
            style={{
              maxWidth: "300px",
            }}>
            <Toast.Header>
              <strong className="me-auto text-success fw-bold fs-5">
                Success
                <i className="bi bi-check2-circle text-success"></i>
              </strong>
            </Toast.Header>
            <Toast.Body className="bg-white">
              <h6>{toast.message}</h6>
              <div className="content-product-detail-toast bg-white">
                <img src={toast.img} style={{ width: "60px" }} alt="" />
                <span className="fw-bold mx-3">
                  {toast.productName} x {toast.quantity}
                </span>
              </div>
            </Toast.Body>
          </Toast>
        ))}
      </div>
    </>
  );
};

export default Productdetail;
