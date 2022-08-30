import { client } from "../../../lib/client";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        //console.log(req.body)
        // try {
        //     const cart = req.body;
        //     const result = await client.createIfNotExists(cart);
        //         // .then(() => res.status(200).json('Redirecting....'));
        //     if (cart) {
        //         res.status(200).json(result)
        //     }
        // } catch (error) {
        //     console.error(error.message)
        // }

        const cart = req.body;
        const result = await client.createIfNotExists(cart);
            // .then(() => res.status(200).json('Redirecting....'));
        if (result) {
            res.status(200).json(result)
        }
    }
}