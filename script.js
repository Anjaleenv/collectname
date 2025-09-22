document.getElementById('favorite-person-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    const personName = document.getElementById('person-name').value;
    const messageDiv = document.getElementById('message');

    // Make sure the input isn't empty
    if (personName.trim() === '') {
        messageDiv.textContent = 'Please enter a name.';
        return;
    }

    try {
        const response = await fetch('/api/collectname', { // This path points to your serverless function
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: personName }),
        });

        if (response.ok) {
            messageDiv.textContent = 'Thanks! Your favorite person has been saved. 🎉';
            document.getElementById('favorite-person-form').reset(); // Clear the form
        } else {
            const errorData = await response.json();
            messageDiv.textContent = `Error: ${errorData.message || 'Something went wrong.'}`;
        }
    } catch (error) {
        messageDiv.textContent = `Network error: ${error.message}`;
    }
});