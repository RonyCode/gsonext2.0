import { toast } from "@/hooks/use-toast";

export async function subscribeUserToPush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push notifications não são suportadas pelo navegador.");
    alert("Seu navegador não suporta notificações push.");
    return null;
  }

  // Garante que o Service Worker está pronto

  // Se você tiver problemas aqui, verifique o console para erros no registro do Service Worker
  // const registration = await navigator.serviceWorker.ready;

  // Solicita permissão ao usuário
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    toast({
      variant: "warning",
      title: "Permissão para notificações foi negada pelo usuário",
      description:
        "Você não permitiu as notificações. Para ativá-las, verifique as permissões do site nas configurações do seu navegador.",
    });
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/service-worker/index.js",
      {
        scope: "/service-worker/",
        updateViaCache: "none",
      },
    );
    // Inscreve o usuário para as notificações push
    return await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, // Certifique-se que esta chave está correta
    });
  } catch (error) {
    toast({
      variant: "danger",
      title: "Erro ao inscrever o usuário para notificações push",
      description:
        "Ocorreu um erro ao tentar ativar as notificações.Error:" + error,
    });
    return null;
  }
}

export async function unsubscribeUserFromPush(): Promise<boolean> {
  if (!("serviceWorker" in navigator)) {
    console.warn(
      "Service Worker não suportado, não é possível cancelar a subscrição.",
    );
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/service-worker/index.js",
      {
        scope: "/service-worker/",
        updateViaCache: "none",
      },
    );
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      return await subscription.unsubscribe();
    }
    console.log("Nenhuma subscrição de push ativa para cancelar.");
    return true; // Considera sucesso se não havia subscrição
  } catch (error) {
    toast({
      variant: "danger",
      title: "Erro ao cancelar a subscrição de notificações push: " + error,
      description:
        "Ocorreu um erro ao tentar desativar as notificações. Verifique o console para mais detalhes." +
        error,
    });

    return false;
  }
}
