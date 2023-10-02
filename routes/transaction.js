const express = require("express");

const router = express.Router();

const TransactionController = require("../app/controller/transaction.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /transaction:
 *  get:
 *     tags:
 *     - Transaction
 *     summary: Get Log Transaction based on Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/transaction", AuthMiddleware, TransactionController.index);

/**
 * @openapi
 * /transaction/{id}:
 *  get:
 *     tags:
 *     - Transaction
 *     summary: Get Detail of the Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/transaction/:id", AuthMiddleware, TransactionController.detail);

/**
 * @openapi
 * /transaction:
 *  post:
 *     tags:
 *     - Transaction
 *     summary: Transaction Process
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/transaction", AuthMiddleware, TransactionController.store);

module.exports = router;