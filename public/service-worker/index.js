const installEvent = () => {
  self.addEventListener("install", () => {
    console.log("service worker installed");
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("service worker activated");
  });
};
activateEvent();

const cacheName = "v2";

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener("fetch", (e) => {
    const request = e.request;
    const requestUrl = new URL(request.url);

    // Se for uma solicitação de navegação ou uma solicitação entre origens,
    // ignore o cache e vá diretamente para a rede.
    // Isso é crucial para redirecionamentos OAuth e busca de recursos externos.
    if (request.mode === "navigate" || requestUrl.origin !== self.origin) {
      e.respondWith(fetch(request));
      return;
    }

    // Para solicitações da mesma origem que não são de navegação (por exemplo, ativos locais, chamadas de API da mesma origem)
    // use a estratégia de cache existente.
    e.respondWith(
      cacheClone(e) // Tenta a rede, depois armazena em cache.
        .catch(() => caches.match(request)), // Recorre ao cache se a rede falhar.
      // O .then((res) => res) foi removido por ser redundante aqui.
    );
  });
};

fetchEvent();

self.addEventListener("push", function (event) {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    console.warn("Permissão para notificações não concedida.");
    return;
  }

  let pushData = {};
  try {
    pushData = event.data.json();
  } catch (e) {
    console.error("Erro ao fazer parse do JSON dos dados do push:", e);
    // Fallback para dados básicos se o JSON falhar
    pushData = {
      title: "Nova Notificação",
      body: "Você tem uma nova atualização.",
      url: "/", // URL padrão para abrir
    };
  }

  const title = pushData.title || "Notificação Padrão";
  const options = {
    body: pushData.body || "Corpo da notificação padrão.",
    icon: pushData.icon || "/images/android-chrome-192x192.png", // Ícone principal da notificação (maior)
    badge: pushData.badge || "/images/android-chrome-192x192.png", // Ícone menor (para barra de status, etc.)
    imageUrl: pushData.image || "/images/android-chrome-512x512.png", // URL de uma imagem maior para exibir na notificação
    image: pushData.image, // URL de uma imagem maior para exibir na notificação
    vibrate: pushData.vibrate || [200, 100, 200], // Padrão de vibração
    timestamp: pushData.timestamp || Date.now(), // Quando a notificação foi enviada
    requireInteraction: pushData.requireInteraction || false, // Se true, a notificação permanece
    silent: pushData.silent || false, // Se true, não emite som ou vibração
    tag: pushData.tag, // ID para agrupar/substituir notificações
    renotify: pushData.renotify || false, // Se true, notifica mesmo ao substituir com a mesma tag
    sound: pushData.sound, // Caminho para um arquivo de som customizado (ex: '/sounds/notification.mp3')
    data: {
      notifURL: pushData.url || "/", // URL para abrir ao clicar na notificação
      customData: pushData.customData,
    },
    actions: pushData.actions || [], // Array de ações (botões)
  };

  // Remove opções indefinidas para evitar problemas com a API
  Object.keys(options).forEach(
    (key) => options[key] === undefined && delete options[key],
  );
  if (options.actions && options.actions.length === 0) {
    delete options.actions;
  }

  // event.waitUntil(self.registration.showNotification(title, options));

  event.waitUntil(
    self.registration.showNotification(title, options).then(() => {
      // Após a promessa de showNotification ser resolvida (notificação solicitada com sucesso),
      // envie uma mensagem para todos os clientes ativos.
      return self.clients.matchAll({ type: "window" }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: "push-received", payload: pushData });
        });
      });
    }),
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const action = event.action;
  let targetUrl = event.notification.data.notifURL || "/"; // URL padrão

  // Lógica para determinar a URL baseada na ação
  if (action === "explore" && event.notification.data.customData?.exploreUrl) {
    targetUrl = event.notification.data.customData.exploreUrl;
    console.log('Ação "Explorar" clicada, URL:', targetUrl);
  } else if (
    action === "reply" &&
    event.notification.data.customData?.replyUrl
  ) {
    targetUrl = event.notification.data.customData.replyUrl;
    console.log('Ação "Responder" clicada, URL:', targetUrl);
  } else if (action) {
    // Para outras ações, pode-se ter uma URL específica ou manter a notifURL
    console.log(`Ação "${action}" clicada, URL padrão:`, targetUrl);
  } else {
    console.log("Corpo da notificação clicado, URL:", targetUrl);
  }

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Verifica se já existe uma janela/aba aberta com a URL de destino
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          // Remove a barra final da URL do cliente para comparação mais flexível, se necessário
          const clientUrl = client.url.endsWith("/")
            ? client.url.slice(0, -1)
            : client.url;
          const targetUrlNormalized = targetUrl.endsWith("/")
            ? targetUrl.slice(0, -1)
            : targetUrl;

          if (clientUrl === targetUrlNormalized && "focus" in client) {
            return client.focus();
          }
        }
        // Se nenhuma janela/aba for encontrada, abre uma nova
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      }),
  );
});
