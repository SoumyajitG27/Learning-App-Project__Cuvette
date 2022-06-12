
import admin from 'firebase-admin'

// const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify('serviceAccount.json')))
});

export const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization !== 'Bearer null' && authorization.startsWith('Bearer ')) {
        const idToken = authorization.slice(7, authorization.length);
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            req.user = decodedToken;
            console.log(req.user);
            next()
        } catch (err) {
            res.status(401).send({ message: 'Unauthorized' });
        }
    }
    else {
        res.status(401).send({ message: 'No Token' });
    }
}
























// import jwt from 'jsonwebtoken';

// export const generateToken = (user) => {
//     return jwt.sign(
//         {
//             _id: user._id,
//             email: user.email,
//             isAdmin: user.isAdmin,
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: '30d',
//         }
//     );
// };