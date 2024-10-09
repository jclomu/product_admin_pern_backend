import { Router } from "express"
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts, updateProduct, deleteProduct, updateAvailability } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
* @swagger
* components:
*    schemas:
*      Product:
*          type: object
*          properties: 
*              id:
*                  type: integer
*                  description: The Product Id
*                  example: 1    
*              name: 
*                  type: string
*                  description: The Product name
*                  example: LaunchPad Novation    
*              price: 
*                  type: number
*                  description: The Product price
*                  example: 990  
*              availability: 
*                  type: boolean
*                  description: The Product availability
*                  example: true  
*/

/**
* @swagger
* /api/products:
*      get:
*          summary: Get a list of products
*          tags:   
*               - Products
*          description: Return a list of products
*          responses: 
*              200: 
*                  description: Succesful response 
*                  content:
*                         application/json:
*                              schema:
*                                  type: array
*                                  items:
*                                      $ref: '#/components/schemas/Product' 
* 
* 
* 
*/
router.get('/', getProducts)

/** 
* @swagger
* /api/products/{id}:
*      get:
*          summary: Get a product by id
*          tags:
*               - Products
*          description: Return a product based on its unique ID
*          parameters:
*             - in: path
*               name: id
*               description: The ID of the product to retrieve
*               requiered: true
*               schema:
*                   type: integer
*          responses:
*               200:
*                   description: Succesful Response
*                   content: 
*                       application/json:
*                           schema:
*                               $ref: '#/components/schemas/Product' 
*               404:
*                   description: Not Found
*               400:
*                   description: Bad Request - Invalid ID
*           
* 
*/
router.get('/:id',
    param('id').isInt().withMessage('Invalid Id'),
    handleInputErrors,
    getProductById)

/**
* @swagger
* /api/products:
*       post: 
*           summary: Creates a new product
*           tags: 
*               - Products
*           description: Return a new record in the database
*           requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               name: 
*                                   type: string
*                                   example: "Imac"
*                               price:
*                                   type: number
*                                   example: 200
*           responses:
*               201: 
*                   description: Succesful response
*                   content: 
*                       application/json:
*                           schema:
*                               $ref: '#/components/schemas/Product'
*               400:
*                   description: Bad Request - invalid input data
*/
router.post('/',
    // Validation
    body('name')
        .notEmpty().withMessage('name is required'),
    body('price')
        .isNumeric().withMessage('price must be a number')
        .notEmpty().withMessage('price is required')
        .custom(value => value > 0).withMessage('price not valid'),
    handleInputErrors,
    createProduct
)

/**
* @swagger
* /api/products/{id}:
*       put:
*           summary: Updates a product with user input
*           tags: 
*               - Products
*           description: Returns the updated product
*           parameters: 
*             - in: path
*               name: id
*               description: The ID of the product to retrieve
*               requiered: true
*               schema:
*                   type: integer
*           requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               name: 
*                                   type: string
*                                   example: "Imac"
*                               price:
*                                   type: number
*                                   example: 200
*                               availability: 
*                                   type: boolean
*                                   example: true
*           responses:
*               200:
*                   description: Succesful response
*                   content:
*                       application/json:
*                           schema:
*                               $ref: '#/components/schemas/Product'
*               400:
*                   description: Bad request - Invalid ID or invalid input
*               404:           
*                   description: Product not found
*/      
router.put('/:id',
    param('id').isInt().withMessage('Invalid Id'),
    body('name')
        .notEmpty().withMessage('name is required'),
    body('price')
        .isNumeric().withMessage('price must be a number')
        .notEmpty().withMessage('price is required')
        .custom(value => value > 0).withMessage('price not valid'),
    body('availability')
        .isBoolean().withMessage('Invalid disponibility'),
    handleInputErrors,
    updateProduct)

/**
* @swagger
* /api/products/{id}:
*      patch:
*          summary: Update Product Availability
*          tags: 
*              - Products
*          description: Returns the update availability
*          parameters: 
*             - in: path
*               name: id
*               description: The ID of the product to retrieve
*               requiered: true
*               schema:
*                   type: integer
*          responses:
*               200:
*                   description: Succesful response
*                   content:
*                       application/json:
*                           schema:
*                               $ref: '#/components/schemas/Product'
*               400:
*                   description: Bad request - Invalid ID 
*               404:           
*                   description: Product not found                        
*/
router.patch('/:id',
    param('id').isInt().withMessage('Invalid Id'),
    handleInputErrors,
    updateAvailability)

/**
*@swagger
* /api/products/{id}:
*      delete:
*          summary: Deletes product by id
*          tags: 
*              - Products
*          description: Returns succefuly message
*          parameters: 
*             - in: path
*               name: id
*               description: The ID of the product to delete
*               requiered: true
*               schema:
*                   type: integer 
*          responses:
*               200:
*                   description: Product Deleted successfuly
*                   content: 
*                       schema:
*                           type: string
*                           value: Deleted
*               400:
*                   description: Bad Request
*               404: 
*                   description: Product not Found 
*/
router.delete('/:id',
    param('id').isInt().withMessage('Invalid Id'),
    handleInputErrors,
    deleteProduct
)

export default router