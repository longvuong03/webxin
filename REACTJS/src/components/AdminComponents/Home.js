import React from "react";
import Nav from "./Navs";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
function Home() {
  return (
    <div>
      <Nav />

      <div className="">
        <div className="row g-3 my-2">
          <div className="col-md-3">
            <div className="p-3 flex-column bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <h3>230</h3>
              <p>Products</p>
              <i class="bi bi-cart fs-1"></i>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 flex-column bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <h3>230</h3>
              <p>Products</p>
              <i class="bi bi-cart fs-1"></i>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 flex-column bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <h3>230</h3>
              <p>Order</p>
              <i class="bi bi-truck fs-1"></i>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 flex-column bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <h3>230</h3>
              <p>Products</p>
              <i class="bi bi-cart fs-1"></i>
            </div>
          </div>
        </div>
        <table class="table caption-top bg-white rounded">
          <caption className="text-white fs-3">Recent order</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>Fidelia</td>
              <td>Oralie</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Product 2</td>
              <td>Product 4</td>
              <td>Product 1</td>
              <td>Product 6</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>12.99$</td>
              <td>14.99$</td>
              <td>7.99$</td>
              <td>12.99$</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Paid</td>
              <td>Cash on delivery</td>
              <td>Cash on delivery</td>
              <td>Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
