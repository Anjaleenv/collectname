// api/getnames.js
import { kv } from '@vercel/kv';

export default async (req, res) => {
    try {
        // Get all entries from the KV store
        const keys = await kv.keys('*'); // Get all keys
        const names = await kv.mget(...keys); // Get all values for those keys

        res.status(200).json({ names: names });
    } catch (error) {
        console.error('Error fetching names:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};