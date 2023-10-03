const express = require("express");

const router = express.Router();

const ProductController = require("../app/controller/product.controller");
const ProductValidator = require("../app/validator/product.validator");
const AuthMiddleware = require("../middleware/auth.middleware");
const upload = require('../middleware/upload.middleware');

/**
 * @openapi
 * /product/{category_id}:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get Product based on Category ID
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: category_id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/product/:category_id", AuthMiddleware, ProductController.index);

/**
 * @openapi
 * /product:
 *  post:
 *     tags:
 *     - Product
 *     summary: Add Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - category_id
 *              - price
 *              - image
 *            properties:
 *              name:
 *               type: string
 *              category_id:
 *               type: integer
 *              price:
 *               type: integer
 *              image:
 *               type: file
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/product", upload.single('image'), ProductValidator.store, AuthMiddleware, ProductController.store);


/**
 * @openapi
 * /product/{id}:
 *  put:
 *     tags:
 *     - Product
 *     summary: Update Product
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Product
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - category_id
 *              - price
 *              - image
 *            properties:
 *              name:
 *               type: string
 *              category_id:
 *               type: integer
 *              price:
 *               type: integer
 *              image:
 *               type: file
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/product/:id", upload.single('image'), AuthMiddleware, ProductController.update);

/**
 * @openapi
 * /product/{id}:
 *  delete:
 *     tags:
 *     - Product
 *     summary: Delete Product
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the product
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/product/:id", AuthMiddleware, ProductController.destroy);

module.exports = router;
