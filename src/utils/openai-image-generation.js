/*
  Especificación:
   - Agregue el código a la aplicación React como una función "generateImage" para llamar a la API pública de OpenAI
   - La función debe recibir como entrada el texto y la cantidad de imágenes a generar
   - Generar la función "generateImage" para la llamada a la api de OpenAI deducida del siguiente ejemplo CURL:
     curl https://api.openai.com/v1/images/generations \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -d '{
            "model": "dall-e-3",
            "prompt": "A cute baby sea otter",
            "n": 1,
            "size": "1024x1024"
        }'
*/

export const generateImage = async (text, n) => {

    const url = process.env.REACT_APP_OPENAI_API_ENDPOINT;
    const key = process.env.REACT_APP_OPENAI_API_KEY;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            // The model to use for image generation.
            // Defaults to dall-e-2
            model: 'dall-e-3',
            // A text description of the desired image(s). 
            // The maximum length is 1000 characters for dall-e-2 and 4000 characters for dall-e-3
            prompt: text,
            // The number of images to generate. Must be between 1 and 10. For dall-e-3, only n=1 is supported.
            n,
            // The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 for dall-e-2. 
            // Must be one of 1024x1024, 1792x1024, or 1024x1792 for dall-e-3 models.
            size: '1024x1024',
        }),
    };
    
    const response = await fetch(url, options);
    
    const data = await response.json();
    
    return data;
}

/**
 * Check if the OpenAI API Keys are configured
 */
export const isConfigured = () => {
    return process.env.REACT_APP_OPENAI_API_KEY && process.env.REACT_APP_OPENAI_API_ENDPOINT;
}