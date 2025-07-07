"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { ProfileWarningToast } from "@/components/ui/ProfileWarningToast";

export function SideProfileAlertBanner() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const shouldShowBanner =
    status === "authenticated" && !session.is_profile_complete;
  const cookieShouldShowBanner = getCookie("profile_alert_banner");
  useEffect(() => {
    if (
      shouldShowBanner &&
      pathname !== "/completar-cadastro" &&
      pathname !== "/auth" &&
      !cookieShouldShowBanner
    ) {
      setCookie("profile_alert_banner", "true", {
        path: "/",
        maxAge: 60 * 5, // 5 minutos
      });
      toast.custom(
        // A função toast.custom recebe uma função que nos dá o ID do toast (t)
        (t) => <ProfileWarningToast toastId={t} />,
        {
          // Opções para personalizar o comportamento
          duration: 10000, // O toast não fechará sozinho
          position: "top-right", // Posição na tela

          // Aplicamos nossa classe de animação personalizada
          classNames: {
            toast: "slide-in-from-bottom",
          },
        },
      );
    }
  }, [pathname, shouldShowBanner, cookieShouldShowBanner, status, session]);
  return <></>;
}
