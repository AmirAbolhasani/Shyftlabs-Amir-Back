import express from 'express';
import { Middleware } from '../middleware/Middleware';

import { GetAll } from '../controller/course/GetAll';
import { Post } from '../controller/course/Post';
import { Delete } from '../controller/course/Delete';

const router = express.Router({ mergeParams: true });

let middleware = new Middleware();


/**
 * @swagger
 * /course/all:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 */
router.get('/all', middleware.getHandler(new GetAll()));

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Create a course
 *     tags:
 *       - Course
 *     requestBody:
 *       description: Course data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course created successfully
 */
router.post('/', middleware.getHandler(new Post()));

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete('/:id', middleware.getHandler(new Delete()));

export default router;