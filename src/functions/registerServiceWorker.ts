export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrado:', registration);
    } catch (error) {
      console.error('Falha ao registrar Service Worker:', error);
    }
  }
}
