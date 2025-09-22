// api/collectname.js
import { kv } from '@vercel/kv';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }

        // Generate a unique ID for the entry
        const entryId = Date.now().toString();

        // Save the name to Vercel KV
        await kv.set(entryId, name);

        res.status(200).json({ message: 'Name received successfully!' });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};