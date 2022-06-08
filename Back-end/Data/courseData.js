import bcrypt from 'bcryptjs'

const courseData = {
    users: [
        {
            name: "Soumyajit",
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
            isTeacher: false
        },
        {
            name: "Jack",
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
            isTeacher: false
        },
        {
            name: "Mary",
            email: 'teacher@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
            isTeacher: true
        }
    ],
    courses: [
        {
            // _id: '1',
            name: 'Build Facebook clone using MERN',
            slug: 'facebook-using-mern',
            image: 'image1.jpg',
            category: 'Web development courses',
            video: 'https://www.youtube.com/embed/Az-mGR-CehY',
            sections: ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5',
                'Section 6', 'Section 7', 'Section 8', 'Section 9', 'Section 10'],
            price: 250,
            instructor: 'Alan Walker',
            rating: 4.5,
            numReviews: 10,
            description: 'Learn Full stack development',
            language: 'English, Hindi',
            noOfStudents: 1376
        },
        {
            // _id: '2',
            name: 'Android Development Course',
            slug: 'android-dev',
            image: 'image2.jpg',
            category: 'Android development courses',
            video: 'https://www.youtube.com/embed/fKopy74weus',
            sections: ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5',
                'Section 6', 'Section 7', 'Section 8'],
            price: 400,
            instructor: 'Imagine Dragons',
            rating: 4.7,
            numReviews: 14,
            description: 'Learn Android development',
            language: 'English, Hindi',
            noOfStudents: 2355
        },
        {
            // _id: '3',
            name: 'Flutter Development Course',
            slug: 'flutter-dev',
            image: 'image3.jpg',
            category: 'Flutter development courses',
            video: 'https://www.youtube.com/embed/0OGguI0uDfE',
            sections: ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5',
                'Section 6', 'Section 7', 'Section 8', 'Section 9'],
            price: 500,
            instructor: 'KK',
            rating: 5,
            numReviews: 10,
            description: 'Learn Android development',
            language: 'English, Hindi',
            noOfStudents: 2371
        },
    ]
}

export default courseData