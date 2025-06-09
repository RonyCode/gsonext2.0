// File: pages/api/image-proxy.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { imageUrl } = req.query; // Pega a URL da imagem da query string

  if (!imageUrl || typeof imageUrl !== "string") {
    return res.status(400).json({ error: "imageUrl parameter is required" });
  }

  try {
    const externalResponse = await fetch(imageUrl);

    if (!externalResponse.ok) {
      // Repassa o status e uma mensagem de erro do serviço externo
      return res.status(externalResponse.status).json({
        error: `Failed to fetch image from external source. Status: ${externalResponse.status}`,
      });
    }

    // Pega o tipo de conteúdo da resposta original para repassar
    const contentType = externalResponse.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    // Pega o corpo da resposta como um ArrayBuffer
    const buffer = await externalResponse.arrayBuffer();

    // Envia o buffer como resposta. O Next.js/Node.js lidará com isso.
    // Convertendo para Buffer do Node.js para garantir compatibilidade.
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Image proxy error:", error);
    res
      .status(500)
      .json({ error: "Internal server error while proxying image" });
  }
}
