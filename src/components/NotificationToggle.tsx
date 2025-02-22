'use client';

import { useState, useEffect } from 'react';
import {subscribeUserToPush} from "@/functions/pushSubscription";

export default function PushNotificationToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Notification.permission === 'granted');
  }, []);

  const handleToggle = async () => {
    if (!enabled) {
      const subscription = await subscribeUserToPush();
      if (subscription) {
        // Aqui você pode enviar a subscription para o backend
        console.log('Enviando push subscription para backend...');
        setEnabled(true);
        localStorage.setItem('pushEnabled', 'true');
      }
    } else {
      setEnabled(false);
      localStorage.setItem('pushEnabled', 'false');
    }
  };

  return (
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <span>Notificações Push</span>
          <input type="checkbox" checked={enabled} onChange={handleToggle} className="hidden" />
          <div className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </label>
      </div>
  );
}
