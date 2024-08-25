import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { fetchAllProduct,getbyidProduct } from '../../services/ProductService';
import { useParams } from 'react-router-dom';
import '../../asset/css/stylesp.css';

const Productdetail = () => {

    
    const { idproduct } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetchAllProduct();
    }, [idproduct]);

    const fetchAllProduct = async () => {
        try {
            const res = await getbyidProduct(idproduct);
            console.log('Fetched room:', res);
            setProduct(res);
        } catch (error) {
            console.error('Error fetching room:', error);
        }
    };
    
    return (
        <div className="container-fluid bg-f8f8f8">
        <div className="container">
          <div className="row">
            <div className="col-9">
              <p className="fw-bolder fs-6">PRODUCT</p>
            </div>
            <div className="col-2 fs-6 fw-bolder text-secondary">HOME / PRODUCT</div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-3 responsive_none brandsp">
                <div className="row border border-1">
                  <p></p>
                  <p className="fw-bold">BRAND</p>
                  <a href="#">Clothing</a>
                  <a href="#">Bags</a>
                  <a href="#">Footwear</a>
                  <a href="#">Watches</a>
                  <a href="#">Accessories</a>
                  <p></p>
                </div>
                <div className="row border border-1 mt-2">
                  <div className="row nt-1 mb-1">
                    <div className="col-3">
                      <i className="fa fa-truck-fast fs-3 mt-3 color-primary"></i>
                    </div>
                    <div className="col-9">
                      <span className="font-size-small fw-bold">Free Shipping</span>
                      <p className="font-size-small">Free Shipping World Wide</p>
                    </div>
                    <div className="hr-brandsp"></div>
                  </div>
                  <div className="row nt-1 mb-1">
                    <div className="col-3">
                      <i className="ion ion-stopwatch-outline fs-2 color-primary mt-3"></i>
                    </div>
                    <div className="col-9">
                      <span className="font-size-small fw-bold">24/7 Service</span>
                      <p className="font-size-small">Online Service For Customer</p>
                    </div>
                    <div className="hr-brandsp"></div>
                  </div>
                  <div className="row nt-1 mb-1">
                    <div className="col-3">
                      <i className="fa fa-bullhorn fs-3 mt-2 color-primary" style={{ transform: 'rotate(-45deg)' }}></i>
                    </div>
                    <div className="col-9">
                      <span className="font-size-small fw-bold">Festival Offer</span>
                      <p className="font-size-small">New Online Festival Offer</p>
                    </div>
                    <div className="hr-brandsp"></div>
                  </div>
                  <div className="row nt-1 mb-1">
                    <div className="col-3">
                      <i className="ion ion-card-outline fs-2 mt-3 color-primary"></i>
                    </div>
                    <div className="col-9">
                      <span className="font-size-small fw-bold">Online Payment</span>
                      <p className="font-size-small">Contrary To Popular Belief.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <img src={product.img} alt="" className="imgsp" id="imgsp" />
                    <div className="row">
                      <div className="col-3">
                        {/* <img
                          src="./images/pro5.jpg"
                          alt=""
                          className="imgdes"
                          id="imgdes"
                          onClick={() => handleImageClick('./images/pro5.jpg')}
                        /> */}
                      </div>
                      <div className="col-3 mx-auto">
                        {/* <img
                          src="./images/pro6.jpg"
                          alt=""
                          className="imgdes"
                          id="imgdes"
                          onClick={() => handleImageClick('./images/pro6.jpg')}
                        /> */}
                      </div>
                      <div className="col-3">
                        {/* <img
                          src="./images/pro9.jpg"
                          alt=""
                          className="imgdes"
                          id="imgdes"
                          onClick={() => handleImageClick('./images/pro9.jpg')}
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 offset-1 col-sm-12">
                    <span className="fs-2 fw-bolder">{product.nameProduct}</span>
                    <p>
                      <span className="fs-6 text-secondary text-decoration-line-through">{product.Price}</span>&ensp;
                      <span className="fs-5 color-primary">40% Off</span>
                    </p>
                    <span className="fs-3">$87</span>
                    <hr />
                    <p className="fw-bold">Size</p>
                    <span className="text-decoration-none fs-3 text-dark btnlinksize btnlinksize-active">M</span>&emsp;
                    <span className="text-decoration-none fs-3 text-dark btnlinksize">XL</span>&emsp;
                    <span className="text-decoration-none fs-3 text-dark btnlinksize">L</span>
                    <p className="fw-bold mt-3">Quantity</p>
                    <p className="pquanity">
                      <button id="minus" className="buttonminus">
                        <span className="fs-4 text-dark">
                          <i className="fa fa-angle-left"></i>
                        </span>
                      </button>
                      <span id="numberPlace">0</span>
                      <button id="plus" className="buttonplus">
                        <span className="fs-4 text-dark">
                          <i className="fa fa-angle-right"></i>
                        </span>
                      </button>
                    </p>
                    <button className="buttonbuy" id="liveToastBtn">
                      ADD TO CART
                    </button>
                    <button className="buttonbuy">BUY NOW</button>
                    <hr />
                    <p className="fw-bold">Product Detail</p>
                    <p className="text-secondary font-size-small">
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );

}

export default Productdetail;
