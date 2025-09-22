// This is the serverless function that Vercel will run
export default async (req, res) => {
    // This function will only run for POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Get the data from the request body
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }

        // ---
        // Here's where you'd connect to a database to save the data.
        // For this example, we'll just log it to the console.
        console.log(`Received a new favorite person: ${name}`);
        // ---

        // Send a success response back to the front-end
        res.status(200).json({ message: 'Name received successfully!' });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};