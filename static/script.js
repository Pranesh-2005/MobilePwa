document.getElementById('analyzeButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;

    const response = await fetch('/analyze', { // Use relative URL for the API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
    });

    const result = await response.json();
    document.getElementById('result').innerText = result.predicted_sentiment;
});
