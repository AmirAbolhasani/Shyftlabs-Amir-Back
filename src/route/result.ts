import express from 'express';
import { Middleware } from '../middleware/Middleware';

import { GetAll } from '../controller/result/GetAll';
import { Post } from '../controller/result/Post';

const router = express.Router({ mergeParams: true });

let middleware = new Middleware();


/**
 * @swagger
 * /result/all:
 *   get:
 *     summary: Get all results
 *     tags:
 *       - Result
 *     responses:
 *       200:
 *         description: Results retrieved successfully
 */
router.get('/all', middleware.getHandler(new GetAll()));

/**
 * @swagger
 * /result:
 *   post:
 *     summary: Create a result
 *     tags:
 *       - Result
 *     requestBody:
 *       description: Result data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 format: int64
 *               course_id:
 *                 type: integer
 *                 format: int64
 *               score:
 *                 type: string
 *                 enum:
 *                   - A
 *                   - B
 *                   - C
 *                   - D
 *                   - E
 *                   - F
 *     responses:
 *       200:
 *         description: Result created successfully
 */
router.post('/', middleware.getHandler(new Post()));

export default router;