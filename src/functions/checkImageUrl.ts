/**
 * Verifica se uma URL de imagem é válida
 * @param url - URL da imagem para verificar
 * @param timeout
 * @returns Promise<boolean> - Retorna true se a imagem for válida, false caso contrário
 */
export const checkImageUrl = async (
  url?: string | null,
  timeout = 5000,
): Promise<boolean> => {
  if (!url) {
    return false;
  }

  if (url.startsWith("/")) {
    return true;
  }

  let urlObject: URL;
  try {
    urlObject = new URL(url);
  } catch (e) {
    console.warn(`Formato de URL inválido: ${e} , ${url}`);
    return false;
  }

  const knownImageHostnames = [
    "googleusercontent.com", // Google
    "fbcdn.net", // Facebook
    "cdninstagram.com", // Instagram
    "pbs.twimg.com", // Twitter/X
    "i.ytimg.com", // YouTube
    // Adicione outros domínios conforme necessário
  ];

  if (
    knownImageHostnames.some((hostname) =>
      urlObject.hostname.endsWith(hostname),
    )
  ) {
    return true;
  }

  // Check if running in a browser environment
  if (typeof window === "undefined" || typeof window.Image === "undefined") {
    // Cannot perform client-side image check in a non-browser environment
    // for URLs not in the knownImageHostnames list.
    return false;
  }

  return new Promise((resolve) => {
    const img = new window.Image();
    let timer: NodeJS.Timeout | null = null;

    img.onload = () => {
      if (timer) clearTimeout(timer);
      resolve(true);
    };

    img.onerror = () => {
      if (timer) clearTimeout(timer);
      // console.warn(`Erro ao carregar imagem (onerror): ${url}`); // Mantido para depuração se necessário
      resolve(false);
    };

    img.src = url;

    timer = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      // console.warn(`Timeout ao carregar imagem: ${url}`);
      resolve(false);
    }, timeout);
  });
};

/**
 * Verifica se uma URL de imagem é válida e retorna a URL padrão caso não seja
 * @param url - URL da imagem para verificar
 * @param defaultImgPath
 * @returns Promise<string> - Retorna a URL válida ou a URL padrão
 */
export const getValidImageUrl = async (
  url?: string | null,
  defaultImgPath: string = "/images/img.svg", // Caminho relativo padrão
): Promise<string> => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_GSO?.trim().replace(/\/$/, ""); // Remove barra final se existir

  // Função para construir uma URL completa a partir de um caminho
  const buildUrl = (path: string): string => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path; // Já é uma URL completa
    }
    if (apiBaseUrl) {
      return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    }
    // Se não houver apiBaseUrl, retorna o caminho como está (será relativo ao domínio atual)
    return path;
  };

  const finalDefaultUrl = buildUrl(defaultImgPath);

  if (!url) {
    return finalDefaultUrl;
  }

  // Se a URL fornecida for um caminho relativo (começa com '/'), constrói a URL completa
  if (url.startsWith("/")) {
    return buildUrl(url);
  }

  // Para URLs externas, verifica se é uma imagem válida
  const isValid = await checkImageUrl(url);
  if (isValid) {
    return url;
  }

  return finalDefaultUrl;
};
