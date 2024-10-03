import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import * as XLSX from "xlsx"; // Thêm thư viện xlsx

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Thêm trạng thái cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Số lượng đơn hàng mỗi trang

  useEffect(() => {
    // Gọi API để lấy danh sách tất cả các đơn hàng
    axios
      .get("https://localhost:7233/api/order/listallorders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleSearch = () => {
    return orders.filter((item) =>
      item.products.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Hàm xuất dữ liệu ra file Excel
  const exportToExcel = () => {
    const filteredOrders = handleSearch();
    // Chuyển đổi dữ liệu đơn hàng thành định dạng cho Excel
    const worksheetData = filteredOrders.map((item, index) => ({
      "Order ID": index + 1,
      "Product Name": item.products.nameProduct.substring(0, 100), // Giới hạn độ dài
      Image: item.products.img.substring(0, 255), // Giới hạn độ dài đường dẫn
      Quantity: item.orderDetail.quantity,
      "Total Price": item.orderDetail.totalPrice,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  
    XLSX.writeFile(workbook, "OrdersList.xlsx");
  };

  // Xác định các đơn hàng cần hiển thị cho trang hiện tại
  const filteredOrders = handleSearch();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div>
        <p className="mt-3 text-secondary">Pages/Dashboard/Order</p>
        <p className="fs-3 fw-bold">Main Order</p>
      </div>
      
      <div className="row d-flex justify-content-between">
          <div className="col-4">
          <div className="search-product-bar my-2">
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-1 py-1 input_product_search"
          />
          <i className="bi bi-search btn btn-success"></i>
        </div>
          </div>
          <div className="col-3 text-end">
            <button className='btn btn-primary' onClick={exportToExcel}>
            <i className="bi bi-file-earmark-excel"></i> Export Excel
            </button>
          </div>
        </div>
      
      <Table className="bg-white">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1 + indexOfFirstItem}</td>
              <td>{item.userName}</td>
              <td>
                <img src={item.products.img} style={{ width: "80px" }} alt="" />
              </td>
              <td>{item.products.nameProduct}</td>
              <td>{item.orderDetail.quantity}</td>
              <td>${item.orderDetail.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Nút phân trang */}
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
          style={{ marginRight: '5px' }}
        >
          &lt;
        </button>
        <span>{currentPage}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          style={{ marginLeft: '5px' }}
        >
          &gt;
        </button>
      </div>

    </div>
  );
};

export default OrdersTable;
