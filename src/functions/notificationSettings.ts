export function getNotificationPermission() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('notificationsEnabled') === 'true';
  }
  return false;
}

export function setNotificationPermission(value: { toString: () => string; }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('notificationsEnabled', value.toString());
  }
}
