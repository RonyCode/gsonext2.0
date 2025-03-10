"use client";

import { useState, useEffect } from "react";
import { subscribeUserToPush } from "@/functions/pushSubscription";

export default function PushNotificationToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Notification.permission === "granted");
  }, []);

  const handleToggle = async () => {
    if (!enabled) {
      const subscription = await subscribeUserToPush();
      if (subscription) {
        // Aqui você pode enviar a subscription para o backend
        setEnabled(true);
        localStorage.setItem("pushEnabled", "true");
      }
    } else {
      setEnabled(false);
      localStorage.setItem("pushEnabled", "false");
    }
  };

  return (
    <div>
      <label className="flex cursor-pointer items-center space-x-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          className="hidden"
        />
        <div
          className={`flex h-6 w-12 items-center rounded-full p-1 transition duration-300 ${enabled ? "bg-primary" : "bg-gray-300"}`}
        >
          <div
            className={`h-4 w-4 transform rounded-full bg-white shadow-md transition duration-300 ${enabled ? "translate-x-6" : "translate-x-0"}`}
          ></div>
        </div>
      </label>
    </div>
  );
}
