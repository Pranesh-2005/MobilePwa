document.getElementById('analyzeButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;

<<<<<<< HEAD
    const response = await fetch('https://mobilepwa.onrender.com/analyze', { // Replace with actual URL when deployed
=======
    const response = await fetch('/analyze', { // Use relative URL for the API endpoint
>>>>>>> 37fc3e5 (Initial commit)
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
    });

    const result = await response.json();
    document.getElementById('result').innerText = result.predicted_sentiment;
});
