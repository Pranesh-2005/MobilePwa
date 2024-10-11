document.getElementById('analyzeButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;

    const response = await fetch('http://localhost:7070/analyze', { // Replace with actual URL when deployed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
    });

    const result = await response.json();
    document.getElementById('result').innerText = result.predicted_sentiment;
});
