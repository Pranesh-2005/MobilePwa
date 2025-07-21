"use client"

import { useState } from "react"

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setResult("Please enter some text")
      return
    }

    setIsLoading(true)
    setResult("")

    try {
      // Replace 'YOUR_BACKEND_URL' with your actual backend URL
      const response = await fetch("https://mobilepwa.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()
      setResult(data.predicted_sentiment)
    } catch (error) {
      setResult("Error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.toLowerCase().includes("positive")) return "text-green-600 bg-green-50 border-green-200"
    if (sentiment.toLowerCase().includes("negative")) return "text-red-600 bg-red-50 border-red-200"
    return "text-blue-600 bg-blue-50 border-blue-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Sentiment Analyzer</h1>
            <p className="text-gray-600 text-lg">Analyze the emotional tone of your text instantly</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="inputText" className="block text-sm font-semibold text-gray-700 mb-3">
                  Enter your text
                </label>
                <textarea
                  id="inputText"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
                  rows={6}
                  placeholder="Type or paste your text here to analyze its sentiment..."
                />
              </div>

              <button
                id="analyzeButton"
                onClick={handleAnalyze}
                disabled={isLoading || !inputText.trim()}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  "Analyze Sentiment"
                )}
              </button>

              {result && (
                <div className="mt-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Analysis Result</label>
                  <div className={`p-6 rounded-xl border-2 ${getSentimentColor(result)}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium uppercase tracking-wide">Sentiment</span>
                      <div id="result" className="text-2xl font-bold capitalize">
                        {result}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">Powered by advanced sentiment analysis technology</p>
          </div>
        </div>
      </div>
    </div>
  )
}
