const express = require("express");

const router = express.Router();

const CartController = require("../app/controller/cart.controller");
const CartValidator = require("../app/validator/cart.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /cart:
 *  get:
 *     tags:
 *     - Cart
 *     summary: Get Cart based on Authentication
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/cart", AuthMiddleware, CartController.index);

/**
 * @openapi
 * /cart:
 *  post:
 *     tags:
 *     - Cart
 *     summary: Add to Cart
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - product_id
 *              - quantity
 *            properties:
 *              product_id:
 *               type: integer
 *              quantity:
 *               type: integer
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
router.post("/cart", AuthMiddleware, CartValidator.store, CartController.store);

/**
 * @openapi
 * /cart/{id}:
 *  put:
 *     tags:
 *     - Cart
 *     summary: Update Cart
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Cart
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - quantity
 *            properties:
 *              quantity:
 *               type: integer
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
router.put("/cart/:id", AuthMiddleware, CartController.update);

/**
 * @openapi
 * /cart/{id}:
 *  delete:
 *     tags:
 *     - Cart
 *     summary: Delete Cart
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the cart
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/cart/:id", AuthMiddleware, CartController.destroy);

module.exports = router;
