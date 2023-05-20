const Category = require("../models/category");
const Product = require("../models/product");

const createProduct = async(req, res) => {
    const {categoria, nombre} = req.body
    const idcategoria = await Category.findById(categoria);
    
    if (!idcategoria){
        return res.status(400).json({
            msg: `La categoria del producto escogido no existe`
        })
    }

    const productoDB = await Product.findOne({nombre});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe `
        })
    }

    const product = Product( req.body );
    await product.save();

    res.status(201).json(product);
}

const getProducts = async(req, res) => {
    const { search } = req.query
    const regex = new RegExp(search,'i')
    // Product
    //     .find({
    //         // $or: [{nombre: regex}, {categoria: regex}],
    //         $or: [{nombre: regex}],
    //     })
    //     // .select('nombre precio -_id')
    //     // .lean()
    //     .then(( data ) => res.json( data ))
    //     .catch(( error ) => res.json({ message: error }));

        const products = await Product.find({
            $or: [{nombre: regex}],
        })
    .populate("categoria",'name')  
    .select('-__v')
    res.json({
        products
    });
}

const getProductById = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById( id )
    .populate("categoria",'name')  
    if (!product){
        return res.status(400).json({
            msg: `La producto no existe`
        })
    }
    res.json({
        product
    });
}

const updateProduct = async(req, res) => {
    const { id } = req.params;
    const { nombre,
            precio,
            descripcion,
            laboratorio,
            stock,
            vencimiento,
            imagen,
            categoria } = req.body;

    const idcategoria = categoria ? await Category.findById(categoria) : true
    
    if (!idcategoria){
        return res.status(400).json({
            msg: `La categoria del producto escogido no existe`
        })
    }

    const productoDB = await Product.findOne({nombre});

    if (productoDB && productoDB.nombre !== nombre) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe `
        })
    }

    const productoUpdated = await Product.findByIdAndUpdate(id, req.body, {new:true})
    res.json({
        producto: productoUpdated
    });
}

const deleteProduct = async(req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product ) {
        return res.status(400).json({
            msg: `El producto ${id} no existe`
        })
    }
    
    Product
        .remove({ _id : id })
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}