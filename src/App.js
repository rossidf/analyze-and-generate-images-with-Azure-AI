import React, { useState } from "react"
import { analyzeImage,isConfigured } from "./utils/azure-image-analysis.js"

function App() {
  const [imageUrl, setImageUrl] = useState("")
  const [results, setResults] = useState()

  const handleClick = async () => {
    try {
      const results = await analyzeImage(imageUrl)
      setResults(results)
    } catch (error) {
      console.error("Error al analizar la imagen:", error)
    }
  }

  if (!isConfigured()) {
    return (
      <p>not configured key/endpoint</p>
    )
  }

  return (
    <div>
      <h1>Computer vision</h1>
      <label htmlFor='url'>Insert url or type Prompt</label>
      <input
        type='text'
        name='url'
        placeholder='Enter URL to analyze or textual prompt to generate an image'
        onChange={(e) => setImageUrl(e.target.value)}
      ></input>
      <br></br>
      <button onClick={handleClick}>Analizar</button>
      <button>Generar</button>
      {results && (
        <div>
          <img src={imageUrl} alt='Image for analyze' style={{ maxWidth: "100%" }} />
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App