/**
 * Verifica se uma URL de imagem é válida
 * @param url - URL da imagem para verificar
 * @returns Promise<boolean> - Retorna true se a imagem for válida, false caso contrário
 */
export const checkImageUrl = async (url?: string | null): Promise<boolean> => {
  if (!url) return false;

  try {
    // Verifica se a URL é válida antes de fazer a requisição
    new URL(url);
    
    const response = await fetch(url, {
      method: 'HEAD'  // Usa HEAD para não baixar a imagem inteira
    });

    if (!response.ok) return false;

    // Verifica se o content-type é de uma imagem
    const contentType = response.headers.get('content-type');
    return contentType ? contentType.startsWith('image/') : false;

  } catch (error) {
    console.error('Erro ao verificar URL da imagem:', error);
    return false;
  }
};

/**
 * Verifica se uma URL de imagem é válida e retorna a URL padrão caso não seja
 * @param url - URL da imagem para verificar
 * @param defaultUrl - URL padrão para retornar caso a imagem seja inválida
 * @returns Promise<string> - Retorna a URL válida ou a URL padrão
 */
export const getValidImageUrl = async (
  url?: string | null,
  defaultUrl: string = '/public/images/img.svg'
): Promise<string> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_GSO?.trim();
  if (!baseUrl) return defaultUrl;

  // Garante que a URL base termina com '/'
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  // Remove '/' inicial da URL se existir
  const normalizedUrl = url?.startsWith('/') ? url.slice(1) : url;
  // Remove '/' inicial da URL padrão se existir
  const normalizedDefaultUrl = defaultUrl.startsWith('/') ? defaultUrl.slice(1) : defaultUrl;

  const fullUrl = normalizedUrl 
    ? `${normalizedBaseUrl}${normalizedUrl}`
    : `${normalizedBaseUrl}${normalizedDefaultUrl}`;
  
  const isValid = await checkImageUrl(fullUrl);
  return isValid ? fullUrl : `${normalizedBaseUrl}${normalizedDefaultUrl}`;
};