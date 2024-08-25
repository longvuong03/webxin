import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import { getbyidProduct, deleteProduct, fetchAllProduct } from '../../services/ProductService';
import ModalAddProduct from './ModalAddProduct';
import Button from 'react-bootstrap/Button';
import ModalEditProduct from './ModalEditProduct';
import { useNavigate } from 'react-router-dom';
import Nav from "../AdminComponents/Navs";
import _ from "lodash"

const TableProduct = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const navigate = useNavigate();

    const [listProducts, setListProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [isShow, setShow] = useState(false);
    const [isShowEdit, setShowedit] = useState(false);
    const [dataProductEdit, setDataProductEdit] = useState({});
    const handleClose = () => { setShow(false); setShowedit(false) }
    const handleShow = () => setShow(true);

    const checkAuth = () => {
        const session = sessionStorage.getItem('user');
        const userIsAuthenticated = session ? true : false;
        setIsLoggedIn(userIsAuthenticated);
        setIsCheckingAuth(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (!isCheckingAuth) {
            if (!isLoggedIn) {
                navigate('/logins');
            } else {
                getProducts(1);
            }
        }
    }, [isLoggedIn, isCheckingAuth, navigate]);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    const handleUpdateTable = (product) => {
        setListProducts([product, ...listProducts]);
    }

    const handleEditProductFromModal = (product) => {
        let cloneListProducts = _.cloneDeep(listProducts);
        let index = listProducts.findIndex(item => item.id === product.id);
        cloneListProducts[index].img = product.img;
        cloneListProducts[index].nameProduct = product.nameProduct;
        cloneListProducts[index].quantity = product.quantity;
        cloneListProducts[index].price = product.price;
        setListProducts(cloneListProducts);
    }

    const getProducts = async (page) => {
        try {
            let res = await fetchAllProduct(page);
            if (res && res.length > 0) {
                setTotalProducts(res.total);
                setListProducts(res);
                setTotalPage(Math.ceil(res.total_page));
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const handlePageClick = (event) => {
        getProducts(event.selected + 1);
    }

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            getProducts(1);
        } catch (error) {
            console.error("Error deleting product:", error);
            getProducts(1);
        }
    }

    const handleShowGetByIdProduct = async (id) => {
        try {
            let res = await getbyidProduct(id);
            if (res && res.id) {
                setDataProductEdit(res);
                setShowedit(true);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    return (
        <>
            <Nav />
            <div className="container">
                <div className="my-3 d-flex justify-content-between">
                    <span className='fs-3 text-white'>List Product:</span>
                    <button className='btn btn-success' onClick={handleShow}>Add new product</button>
                </div>
                <Table className='bg-white'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>sl</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody className='fs-4'>
                        {listProducts && listProducts.length > 0 && listProducts.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td><img style={{ width: 80 }} src={product.img} alt={product.nameProduct} /></td>
                                    <td>{product.quantity}</td>
                                    <td>{product.nameProduct}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Button onClick={() => handleShowGetByIdProduct(product.id)} variant="warning">Edit</Button>{' '}
                                        <Button onClick={() => handleDeleteProduct(product.id)} variant="danger">Delete</Button>{' '}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPage}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName='page-item'
                    nextLinkClassName="page-link"
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                />
                <ModalAddProduct show={isShow} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
                <ModalEditProduct show={isShowEdit} handleClose={handleClose} dataProductEdit={dataProductEdit} handleEditProductFromModal={handleEditProductFromModal} />
            </div>
        </>
    )
}

export default TableProduct;
