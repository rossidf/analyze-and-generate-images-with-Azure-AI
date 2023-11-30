/*
  Especificación:
   - Agregue el código para llamar a la API de Image Analysis 4.0 del servicio Visión de Azure AI 
     a la aplicación React como una función "analyzeImage"
   - La función debe recibir como entrada la dirección URL de la imagen y devolver la respuesta JSON de la API.
   - Generar llamada a la api de Azure Computer Vision deducida del siguiente ejemplo CURL:
     curl.exe -H "Ocp-Apim-Subscription-Key: <subscriptionKey>" -H "Content-Type: application/json" "https://<endpoint>/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview" -d "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"
*/

export const analyzeImage = async (imageUrl) => {
  const subscriptionKey = process.env.REACT_APP_AZURE_API_KEY;
  const endpoint = process.env.REACT_APP_AZURE_API_ENDPOINT;

  const uriBase = endpoint + "/computervision/imageanalysis:analyze";

  console.log(uriBase);
  
  const params = {
      "features": "caption,read",
      "model-version": "latest",
      "api-version": "2023-02-01-preview",
      "language": "en"
  };
  
  const options = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
      },
      body: JSON.stringify({url: imageUrl})
  };
  
  const response = await fetch(uriBase + "?" + new URLSearchParams(params), options);
  const jsonResponse = await response.json();
  return jsonResponse;
}

/**
* Check if the Azure Computer Vision API Keys are configured
*/
export const isConfigured = () => {
  return process.env.REACT_APP_AZURE_API_KEY && process.env.REACT_APP_AZURE_API_ENDPOINT;
}