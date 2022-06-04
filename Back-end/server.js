import express from 'express'
import courseData from './Data/courseData.js';

const app = express();

app.get('/api/courses', (req, res) => {
    res.send(courseData.courses);
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})

