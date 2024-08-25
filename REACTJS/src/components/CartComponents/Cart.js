import React, { useEffect, useState } from "react";
import {
  deleteQuantitycart,
  addQuantitycart,
} from "../../services/CartService";
import { Routes, Route, useNavigate } from "react-router-dom";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  function deleteCartItem(id) {
    fetch(`https://localhost:7233/api/cart/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.cartDetail.id !== id)
          );
          console.log("Cart item deleted successfully");
        } else {
          console.error("Failed to delete cart item");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const deleteQuanity = async (ProductID) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.id) {
      try {
        await deleteQuantitycart(user.id, ProductID);
        await fetchCartItems();
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    } else {
      navigate("/login");
    }
  };
  const addQuanity = async (ProductID) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.id) {
      try {
        await addQuantitycart(user.id, ProductID);
        await fetchCartItems();
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    } else {
      navigate("/login");
    }
  };
  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const response = await fetch(
        `https://localhost:7233/api/cart/listcarrt?userId=${user.id}`
      ); // Nối UserId vào URL
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleDelete = (id) => {
    deleteCartItem(id);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="container container-cart">
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>

            <th scope="col">Name</th>
            <th scope="col">Img</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Tools</th>
          </tr>
        </thead>
        <tbody className="">
          {cartItems.map((item, index) => (
            <tr key={item.cartDetail.id}>
              <td>{index + 1}</td> {/* Cột số thứ tự */}
              <td>{item.products.nameProduct}</td>
              <td>
                <img
                  className="imgcart"
                  src={item.products.img}
                  alt="Product"
                />
              </td>
              <td className="fs-5">
                <button
                  className="p-2 m-2"
                  onClick={() => deleteQuanity(item.products.id)}
                >
                  -
                </button>
                {item.cartDetail.quantity}
                <button
                  className="p-2 m-2"
                  onClick={() => addQuanity(item.products.id)}
                >
                  +
                </button>
              </td>
              <td>${item.cartDetail.totalPrice}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.cartDetail.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
