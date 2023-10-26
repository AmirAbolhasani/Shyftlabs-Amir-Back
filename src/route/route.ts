
import express from 'express';
import student from './student';
import course from './course';
import result from './result';

const router = express.Router({ mergeParams: true });

router.use('/student', student);
router.use('/course', course);
router.use('/result', result);

export default router;