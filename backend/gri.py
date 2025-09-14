import gradio as gr
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from deep_translator import GoogleTranslator
from langdetect import detect
import torch

MODEL_DIR = "model"
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
emotion_labels = {
    0: "Negative 😕",
    1: "Neutral 😐",
    2: "Positive 🙂"
}
translator = GoogleTranslator(source='auto', target='en')

def predict_emotion(text):
    detected_language = detect(text)
    if detected_language != 'en':
        translated_text = translator.translate(text)
    else:
        translated_text = text
    inputs = tokenizer(translated_text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = torch.argmax(logits, dim=-1).item()
    emotion = emotion_labels.get(predicted_class, "Unknown")
    return emotion

iface = gr.Interface(
    fn=predict_emotion,
    inputs=gr.Textbox(lines=2, placeholder="Enter text here...", label="Input Text"),
    outputs=[
        gr.Textbox(label="Predicted Sentiment")
    ],
    title="Emotion Detection App",
    description="Enter text in any language. The app will detect the language, translate if needed, and predict the emotion."
)

if __name__ == "__main__":
    iface.launch(share = True)  # Set share=True to allow public access