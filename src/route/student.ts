import express from 'express';
import { Middleware } from '../middleware/Middleware';

import { GetAll } from '../controller/student/GetAll';
import { Post } from '../controller/student/Post';
import { Delete } from '../controller/student/Delete';

const router = express.Router({ mergeParams: true });

let middleware = new Middleware();


/**
 * @swagger
 * /student/all:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Student
 *     responses:
 *       200:
 *         description: Students retrieved successfully
 */
router.get('/all', middleware.getHandler(new GetAll()));

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Create a student
 *     tags:
 *       - Student
 *     requestBody:
 *       description: Student data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               family:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Student created successfully
 */
router.post('/', middleware.getHandler(new Post()));

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
router.delete('/:id', middleware.getHandler(new Delete()));

export default router;