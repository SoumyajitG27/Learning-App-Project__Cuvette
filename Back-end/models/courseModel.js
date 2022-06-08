import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        video: { type: String, required: true },
        sections: [{ type: String, required: true }],
        price: { type: Number, required: true },
        instructor: { type: String, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        description: { type: String, required: true },
        language: { type: String, required: true },
        noOfStudents: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;

