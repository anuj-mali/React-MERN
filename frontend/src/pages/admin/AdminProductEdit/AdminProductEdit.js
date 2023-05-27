import React, { useState } from "react";

const AdminProductEdit = () => {
    const [name, setProductName] = useState("");
    const [price, setProductPrice] = useState("");
    const [category, setProductCategory] = useState("");
    const [description, setProductDescription] = useState("");
    const [image, setProductImage] = useState("");

    // for image preview
    const [previewImage, setPreviewImage] = useState("");

    // for image setting and preview
    const handleImageUpload = (event) => {
        setProductImage(event.target.files[0]);

        // // Read the image file using FileReader
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <div className="container mt-2">
            <h3 className="text-danger">Updating for for rose</h3>
            <form className="w-50">
                <div class="mb-3">
                    <label for="formFile" class="form-label">
                        Product Name
                    </label>
                    <input onChange={(e) => setProductName(e.target.value)} type="text" class="form-control" id="formFile" placeholder="Enter Product Name" />

                    <label for="formFile" class="form-label mt-2">
                        Product Price
                    </label>
                    <input onChange={(e) => setProductPrice(e.target.value)} type="text" class="form-control" id="formFile" placeholder="Enter Product Price" />
                    <label for="formFile" class="form-label mt-2">
                        Product Category
                    </label>
                    <input onChange={(e) => setProductCategory(e.target.value)} type="text" class="form-control" id="formFile" placeholder="Enter Product Category" />
                    <label for="formFile" class="form-label mt-2">
                        Product Description
                    </label>
                    <textarea onChange={(e) => setProductDescription(e.target.value)} class="form-control" id="textAreaExample" rows="4"></textarea>

                    <label for="formFile" class="form-label mt-2">
                        Product Image
                    </label>
                    <input onChange={handleImageUpload} type="file" class="form-control" id="formFile" placeholder="Enter Product Image" />

                    {previewImage && <img src={previewImage} alt="" className="mt-2 object-cover rounded-3" height={200} width={"100%"} />}
                </div>

                <button type="button" class="btn btn-primary w-100">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default AdminProductEdit;
