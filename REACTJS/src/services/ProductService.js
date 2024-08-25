import axios from "./customize-axios";
const fetchAllProduct = (page) => {
    return axios.get(`api/Product?page=${page}`);
}
const getbyidProduct = (id) => {
    return axios.get(`api/Product/getbyidProduct/${id}`);
}

const postCreateProduct = (img, nameProduct,quantity, price) => {
    console.log(img, nameProduct, price,quantity);
    return axios.post("/api/product", { img : img, nameProduct :nameProduct,quantity : quantity, price : price });
};

const putUpdateProduct = (id, img, nameProduct,quantity, price) => {
    return axios.post(`/api/product/editproduct`, {id:id, img : img, nameProduct :nameProduct,quantity : quantity, price : price });
};

const deleteProduct = (id) => {
    return axios.delete(`/api/product/${id}`);
};

export { fetchAllProduct,getbyidProduct,postCreateProduct,putUpdateProduct,deleteProduct };