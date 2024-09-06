import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Nav from "../AdminComponents/Navs";
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteOrderItem } from "../../services/OrderService";
import "../../asset/css/order.css";

function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderItems = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const response = await fetch(
        `https://localhost:7233/api/order/listorder?userId=${user.id}`
      ); // Nối UserId vào URL
      const data = await response.json();
      setOrderItems(data);
      setLoading(false); // Đánh dấu dữ liệu đã được tải
    } catch (error) {
      console.error("Error fetching order items:", error);
      setError("Error fetching order items");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteOrderItem(id);
    fetchOrderItems(); // Cập nhật lại danh sách sau khi xóa

    // Thực hiện các hành động cần thiết sau khi xóa thành công (ví dụ: cập nhật giao diện)
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo khi đang tải dữ liệu
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi nếu có
  }

  return (
    <>
      <Nav />
      <div className="container bangorder">
        <div className="my-3 d-flex justify-content-between">
          <span className="fs-3 text-white">List Orders:</span>
        </div>
        {orderItems.length === 0 ? (
          <div>No orders found.</div> // Hiển thị thông báo khi không có đơn hàng
        ) : (
          <Table className="bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Img</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>TotalPrice</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={item.orderDetail.id}>
                  <td>{index + 1}</td> {/* Hiển thị số thứ tự */}
                  <td>
                    <img
                      src={item.products.img}
                      style={{ width: "90px" }}
                      alt=""
                    />
                  </td>
                  <td>{item.products.nameProduct}</td>
                  <td>{item.orderDetail.quantity}</td>
                  <td>{item.orderDetail.totalPrice} $</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.orderDetail.id)}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}

export default Order;
