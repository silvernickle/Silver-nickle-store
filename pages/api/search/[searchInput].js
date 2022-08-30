import { client } from "../../../lib/client";

export default async function handler (req, res) {
    if (req.method === 'GET') {
        const { searchInput } = req.query;

        const finalSentence = searchInput.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        const breedQuery = `*[_type == "breed" && title == '${finalSentence}']`

        const breeds = await client.fetch(breedQuery);
        res.status(200).json(breeds);
    }
}