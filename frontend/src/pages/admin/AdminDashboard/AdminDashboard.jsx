import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { addProductApi } from "../../../apis/Api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", productImage);

        addProductApi(formData)
            .then((res) => {
                toast.success("Product Added Successfully");
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    };

    return (
        <>
            <div className="container mt-3">
                <div className="d-flex justify-content-between">
                    <h4>Admin Dashboard</h4>
                    <button type="button" class="btn btn-danger" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                        Add Product
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        Add Product
                                    </h5>
                                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                </div>

                                {/* ANCHOR: Add Product Form */}
                                <div class="modal-body">
                                    <form action="">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="mt-2">
                                                Product Name
                                            </label>
                                            <input type="text" className="form-control" placeholder="Product Name" onChange={handleName} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="mt-2">
                                                Product Price
                                            </label>
                                            <input type="text" className="form-control" placeholder="Product Price" onChange={handlePrice} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="mt-2">
                                                Category
                                            </label>
                                            <input type="text" className="form-control" placeholder="Product Category" onChange={handleCategory} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="mt-2">
                                                Product Description
                                            </label>
                                            <textarea name="description" id="description" className="form-control" cols="30" rows="5" onChange={handleDescription}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="mt-2">
                                                Product Image
                                            </label>
                                            <input type="file" className="form-control" placeholder="Product Image" onChange={handleImageUpload} />

                                            {/* ANCHOR: Image Preview */}
                                            {productImage && <img src={previewImage} alt="product image" className="img-fluid object-cover rounded-3 mt-2" />}
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table mt-3">
                    <thead class="table-warning">
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img src="https://www.picsum.photos/200" alt="" width={70} />
                            </td>
                            <td>Rose</td>
                            <td>$20</td>
                            <td>Botany</td>
                            <td>Red Flower</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <Link to={"/admin/product/edit/123"} type="button" class="btn btn-success">
                                        Edit
                                    </Link>
                                    <button type="button" class="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;
