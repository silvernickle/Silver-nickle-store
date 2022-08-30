// import prisma from "../../../utils/prisma";
// import bcrypt from 'bcrypt';
// import jwtTokens from "../../../utils/jwt-helpers";
// //import { setCookies, getCookie } from 'cookies-next';
// import Cookies from 'cookies';
// import jwt from 'jsonwebtoken';

// export default async (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     const cookies = new Cookies(req, res);

//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Username and password are required.' });
//         }
//         //const encryptedPassword = await bcrypt.hash(password, 10);
//         let loggedUser = await prisma.users.findUnique({
//             where: {
//                 email: email
//             }
//         });
//         const match = await bcrypt.compare(password, loggedUser.password);
//         if (match) {
//             //do jwt and roles stuff
//             const accessToken = jwt.sign(
//                 { "email": loggedUser.email, "role": loggedUser.role },
//                 process.env.ACCESS_SECRET,
//                 { expiresIn: '20s' }
//                 );
//             const refreshToken = jwt.sign(
//                 { "email": loggedUser.email },
//                 process.env.REFRESH_SECRET,
//                 { expiresIn: '1d' }
//             );
//             const role = loggedUser.role

//             //storing the refresh token into the database
//             loggedUser = await prisma.users.update({
//                 data: {
//                     refreshToken: refreshToken
//                 },
//                 where: {
//                     email: email
//                 }
//             })
            
//             //it is adviced to send the refresh token only as a cookie for security reasons
//             //res.cookie('refresh_token', tokens.refreshToken, {httpOnly:true});
//             cookies.set('refresh_token', refreshToken, {httpOnly:true, maxAge: 24 * 60 * 60 * 1000}); //sameSite: 'None', secure: true //maxAge: 24 * 60 * 60 * 1000 reps 24hours
//             //console.log(cookies.get('refresh_token', {req, res}))
//             res.status(200).json({ accessToken, role });
//         } else {
//             res.status(401).json({ message: 'Incorrect password' })
//         }
//     } catch (error) {
//         res.status(400).json({ message: `Something went wrong ${error.message}` });
//     }
// }   //jwt will have a many to one relationship with the user