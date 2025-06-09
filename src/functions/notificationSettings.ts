import { getCookie } from "cookies-next";

export function getNotificationPermission() {
  return getCookie("pushEnabled") === "true";
}
