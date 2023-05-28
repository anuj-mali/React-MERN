const router = require("express").Router();
const authGuard = require("../auth/authGuard");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

// create a add product route
router.post("/add", authGuard, async (req, res) => {
    // destructuring
    const { name, price, category, description } = req.body;

    // image
    const image = req.files.image;

    //validation
    if (!name || !price || !category || !description || !image) {
        return res.status(400).json({ msg: "Please fill all the fields." });
    }

    try {
        // upload image to cloudinary
        const uploadedImage = await cloudinary.uploader.upload(image.path, {
            folder: "products",
            crop: "scale",
        });

        // create a new product
        const newProduct = new Product({
            name,
            image: uploadedImage.secure_url,
            price,
            category,
            description,
        });

        // save product
        await newProduct.save();
        res.status(200).send("Success");
    } catch (err) {
        res.status(500).json({ msg: "Add Product Failed" });
    }
});

// get all products
router.get("/get-products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// get a single product
router.get("/get-products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// update a product
router.put("/update_product/:id", authGuard, async (req, res) => {
    const { name, price, category, description } = req.body;
    const image = req.files.image;
    console.log(req.body);

    //validation
    if (!name || !price || !category || !description || !image) {
        return res.status(400).json({ msg: "Please fill all the fields." });
    }
    try {
        // upload image to cloudinary
        const uploadedImage = await cloudinary.uploader.upload(image.path, {
            folder: "products",
            crop: "scale",
        });

        // get product
        const product = await Product.findById(req.params.id);
        product.name = name;
        product.image = uploadedImage.secure_url;
        product.price = price;
        product.category = category;
        product.description = description;

        // save product
        await product.save();
        res.status(200).send("Success");
    } catch (err) {
        res.status(500).json({ msg: "Add Product Failed" });
    }
});

// delete a product
router.delete("/delete_product/:id", authGuard, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send("Success");
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports = router;
