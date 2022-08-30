import { client } from '../../../lib/client';
import bcrypt from 'bcrypt';

// export default async (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     try {
//         const { email, password } = req.body;
//         const encryptedPassword = await bcrypt.hash(password, 10);

//         const savedUser = await prisma.users.create({
//             data: {
//                 email: email,
//                 password: encryptedPassword
//             }
//         });
//         res.status(200).json(savedUser);
//     } catch (error) {
//         res.status(400).json({ message: `Something went wrong ${error.message}` });
//     }
// }

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = {
            email: email,
            password: encryptedPassword
        } 
        client.createIfNotExists(user)
            .then(() => res.status(200).json('Login success'))
    } catch (error) {
        res.status(400).json({ message: `Something went wrong ${error.message}` });
    }
}