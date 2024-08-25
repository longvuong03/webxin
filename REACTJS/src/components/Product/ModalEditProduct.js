import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateProduct } from '../../services/ProductService'; // Import the product service
import { toast } from 'react-toastify';

const ModalEditProduct = (props) => {
    const { show, handleClose, dataProductEdit, handleEditProductFromModal } = props;
    const [img, setImg] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');


    const handleUpdateProduct = async () => {
        try {
            console.log("Updating product:", dataProductEdit.id, img, nameProduct,quantity, price);
            let res = await putUpdateProduct(dataProductEdit.id, img, nameProduct,quantity, price);
            console.log("Update product response:", res);
            if (res) {
                console.log("Product update successful. Data:", res);
                handleEditProductFromModal({
                    id: dataProductEdit.id,
                    img: img,
                    nameProduct: nameProduct,
                    quantity : quantity,
                    price: price
                });
                handleClose();
                toast.success("Product updated successfully");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product");
        }
    };

    useEffect(() => {
        if (show && dataProductEdit) {

            setImg(dataProductEdit.img);
            setNameProduct(dataProductEdit.nameProduct);
            setPrice(dataProductEdit.quantity);
            setPrice(dataProductEdit.price);

        }
    }, [show, dataProductEdit]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                           
                            
                            <div className="form-group">
                                <label className="form-label">Image URL</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Image URL"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Product Name"
                                    value={nameProduct}
                                    onChange={(e) => setNameProduct(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">quantity</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Price</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditProduct;
