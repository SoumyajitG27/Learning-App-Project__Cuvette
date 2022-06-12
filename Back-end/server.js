import express from 'express'
import courseData from './Data/courseData.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        console.log("Connected to DB")
    }).catch((err) => {
        console.log(err.message);
    });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/seed', seedRouter);
app.use('/api/courses', courseRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


// app.get('/api/courses', (req, res) => {
//     res.send(courseData.courses);
// })

// app.get('/api/courses/slug/:slug', (req, res) => {
//     const course = courseData.courses.find((x) => x.slug
//         === req.params.slug);
//     if (course) {
//         res.send(course);
//     }
//     else {
//         res.status(404).send({ message: 'Course not found' });
//     }
// })
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})

