const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, updateUser, getUserById, deleteUser, createUser } = require('../controllers/user');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateUserRol } = require('../middlewares/validateRoles');


const router = Router();


/**
 * @swagger
 * /api/user:
 *  get:
 *   summary: Return all users
 *   tags: [User]
 *   parameters:
 *    - in: query
 *      name: limite
 *    - in: query
 *      name: desde
 *   responses:
 *     200:
 *      description: Users founded
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/User'
 */
router.get('/', [
    validateJWT, 
    validateUserRol('admin', 'employee')
],  usuariosGet);

/**
 * @swagger
 * /api/user:
 *  post:
 *   summary: Register a new employee o administator
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
 router.post('/', [
    validateJWT,
    validateUserRol('admin', 'employee'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
], createUser)

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *   summary: Update a user by id
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The user id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *      description: The user was successfully updated
 *     404:
 *      description: The user was not found
 */
router.put('/:id', [
    validateJWT, 
    validateUserRol('admin', 'employee')
], updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *   summary: Return a user by id
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The user id
 *   responses:
 *     200:
 *      description: The user was successfully founded
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *     404:
 *      description: The user was not found
 */
router.get('/:id', [
    validateJWT, 
    validateUserRol('admin', 'employee')
],  getUserById);

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *   summary: delete a user
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The user id
 *   responses:
 *     200:
 *      description: The user was successfully deleted
 *     404:
 *      description: The user was not found
 */
router.delete('/:id', [
    validateJWT, 
    validateUserRol('admin', 'employee')
], deleteUser);



module.exports = router;
