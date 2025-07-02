"use client";

import { subscribeUserToPush } from "@/functions/pushSubscription";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

export default function PushSubscriptionManager() {
  useEffect(() => {
    async function registerServiceWorker() {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("/service-worker/index.js", {
            scope: "/service-worker/",
            updateViaCache: "none",
          });

          const subscription = await subscribeUserToPush();
          console.log(JSON.stringify(subscription));
          setCookie("subscription", JSON.stringify(subscription));
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    }

    registerServiceWorker();
  }, []);

  return null;
}
