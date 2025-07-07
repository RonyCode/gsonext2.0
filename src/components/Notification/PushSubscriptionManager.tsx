"use client";

import { subscribeUserToPush } from "@/functions/pushSubscription";
import { setCookie, getCookie } from "cookies-next";
import { useEffect } from "react";

export default function PushSubscriptionManager() {
  useEffect(() => {
    async function setupPushNotifications() {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("Push notifications não são suportadas.");
        return;
      }

      const existingCookie = getCookie("subscription");
      if (existingCookie) {
        console.log("Inscrição para push já existe no cookie.");
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register(
          "/service-worker/index.js",
          {
            scope: "/service-worker/",
            updateViaCache: "none",
          },
        );

        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          console.log("Usuário já está inscrito.");
          setCookie("subscription", JSON.stringify(existingSubscription));
          return;
        }

        console.log(
          "Nenhuma inscrição encontrada, tentando inscrever o usuário...",
        );
        const newSubscription = await subscribeUserToPush(); // Sua função original que pede permissão

        if (newSubscription) {
          console.log(
            "Nova inscrição para push criada:",
            JSON.stringify(newSubscription),
          );
          setCookie("subscription", JSON.stringify(newSubscription));
        }
      } catch (error) {
        console.error("Falha ao configurar as notificações push:", error);
      }
    }

    setupPushNotifications();
  }, []); // O array vazio garante que isso rode apenas uma vez por montagem do componente

  return null; // O componente não renderiza nada visualmente
}
