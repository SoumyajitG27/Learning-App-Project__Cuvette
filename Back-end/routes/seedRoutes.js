import express from 'express';
import courseData from '../Data/courseData.js';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Course.remove({});
    const createdCourses = await Course.insertMany(courseData.courses);
    await User.remove({});
    const createdUsers = await User.insertMany(courseData.users);
    res.send({ createdCourses, createdUsers });
});
export default seedRouter;