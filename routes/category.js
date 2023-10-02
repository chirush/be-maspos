const express = require("express");

const router = express.Router();

const CategoryController = require("../app/controller/category.controller");
const CategoryValidator = require("../app/validator/category.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /category:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get all Category
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
router.get("/category", AuthMiddleware, CategoryController.index);

/**
 * @openapi
 * /category:
 *  post:
 *     tags:
 *     - Category
 *     summary: Add Category
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
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
router.post("/category", AuthMiddleware, CategoryValidator.store, CategoryController.store);

/**
 * @openapi
 * /category/{id}:
 *  put:
 *     tags:
 *     - Category
 *     summary: Update Category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Category
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
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
router.put("/category/:id", AuthMiddleware, CategoryController.update);

/**
 * @openapi
 * /category/{id}:
 *  delete:
 *     tags:
 *     - Category
 *     summary: Delete Category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
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
router.delete("/category/:id", AuthMiddleware, CategoryController.destroy);

module.exports = router;
