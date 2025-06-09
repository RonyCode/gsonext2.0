export async function urlToBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Erro ao obter a imagem: ${response.status}`);
    }

    const blob = await response.blob(); // Obtém o Blob da imagem

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob); // Converte o Blob para data URL (inclui Base64)
    });
  } catch (error) {
    console.error("Erro durante a conversão:", error);
    return null;
  }
}
