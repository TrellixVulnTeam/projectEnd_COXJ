const Product = require("../models/product");

const mongoose = require("mongoose");
const getAll = async (req, res) => {
    let product = await Product.find();
    return res.send(product);
}
const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let product = await Product.findById(id);
    if (!product)
        return res.status(404).send("There is no product with such an ID number");
    return res.send(product);
}

const addProduct = async (req, res) => {
    let product = req.body;
    let newProduct = new Product(product);
    try {
        await newProduct.save();
        console.log(newProduct)
        return res.send(newProduct);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}


module.exports = {
    getAll, getById, addProduct
}