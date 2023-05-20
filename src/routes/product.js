/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Nombre del producto
 *        precio:
 *          type: number
 *          description: Precio del producto
 *        descripcion:
 *          type: string
 *          description: Descripcion del producto
 *        laboratorio:
 *          type: string
 *          description: Laboratorio del producto
 *        stock:
 *          type: number
 *          description: Stock del producto
 *        vencimiento:
 *          type: string
 *          description: Vencimiento del producto
 *        imagen:
 *          type: string
 *          description: Imagen del producto
 *        categoria:
 *          type: string
 *          description: Categoria del producto
 *      required:
 *        - nombre
 *        - precio
 *        - descripcion
 *        - laboratorio
 *        - stock
 *        - vencimiento
 *        - imagen
 *        - categoria
 */

const express = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products');
const { validateFields } = require('../middlewares/validateFields');
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *  post:
 *   summary: Create a new product
 *   tags: [Product]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *   responses:
 *     200:
 *      description: The product was successfully created
 */
router.post('/', [ 
        check('categoria', 'La categoria es requerida').not().isEmpty(),
        check('categoria', 'No es un id de categoria valido').isMongoId(),
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('precio', 'El precio es requerido').not().isEmpty(),
        check('descripcion', 'El descripcion es requerido').not().isEmpty(),
        check('laboratorio', 'El laboratorio es requerido').not().isEmpty(),
        check('stock', 'El stock es requerido').not().isEmpty(),
        check('vencimiento', 'La fecha de vencimiento es requerido').not().isEmpty(),
        check('imagen', 'El imagen es requerido').not().isEmpty(),
        validateFields
], createProduct)

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Return all products
 *   tags: [Product]
 *   parameters:
 *    - in: query
 *      name: search
 *   responses:
 *     200:
 *      description: Products founded
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Return a product by id
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   responses:
 *     200:
 *      description: The product was successfully founded
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Product'
 *     404:
 *      description: The product was not found
 */
router.get('/:id', getProductById)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: Update a product by id
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *   responses:
 *     200:
 *      description: The product was successfully updated
 *     404:
 *      description: The product was not found
 */
router.put('/:id', updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: delete a product
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   responses:
 *     200:
 *      description: The product was successfully deleted
 *     404:
 *      description: The product was not found
 */
router.delete('/:id', deleteProduct)

module.exports = router;
