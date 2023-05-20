/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Nombre del producto
 *        lastname:
 *          type: string
 *          description: Precio del producto
 *        email:
 *          type: string
 *          description: Descripcion del producto
 *        password:
 *          type: string
 *          description: Laboratorio del producto
 *      required:
 *        - name
 *        - lastname
 *        - email
 *        - password
 */


const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth.js');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *   summary: Register a new user
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *      description: The user was successfully created
 */
router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
], createUser)


/**
 * @swagger
 * /api/auth:
 *  post:
 *   summary: Authenticate a user
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *            email:
 *             type: string
 *             description: Email del usuario
 *            password:
 *              type: string
 *              description: Password del usuario
 *   responses:
 *     200:
 *      description: The user was successfully loged
 */
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
], login)

/**
 * @swagger
 * /api/auth/renew:
 *  get:
 *   summary: Validate Token
 *   tags: [User]
 *   responses:
 *     200:
 *      description: The token is renewed
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/User'
 */
router.get('/renew', validateJWT ,renewToken)

module.exports = router;