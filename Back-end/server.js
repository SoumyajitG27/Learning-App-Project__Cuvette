import express from 'express'
import courseData from './Data/courseData.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        console.log("Connected to DB")
    }).catch((err) => {
        console.log(err.message);
    });

const app = express();

app.get('/api/courses', (req, res) => {
    res.send(courseData.courses);
})

app.get('/api/courses/slug/:slug', (req, res) => {
    const course = courseData.courses.find((x) => x.slug
        === req.params.slug);
    if (course) {
        res.send(course);
    }
    else {
        res.status(404).send({ message: 'Course not found' });
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})

