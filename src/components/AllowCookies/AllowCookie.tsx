"use client";

import Link from "next/link";
import React, { type ReactElement, useState, useEffect } from "react";
import { LuCookie } from "react-icons/lu";

import { Button } from "@/ui/button";
import {
  Drawer,
  DrawerClose, // 1. Importe o DrawerClose
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/ui/drawer";
import { getCookie, setCookie } from "cookies-next";

const COOKIE_CONSENT_KEY = "cookie_consent_status";

export const AllowCookie = (): ReactElement | null => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentStatus = getCookie(COOKIE_CONSENT_KEY);
    if (!consentStatus) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (hasConsented: boolean): void => {
    setCookie(COOKIE_CONSENT_KEY, String(hasConsented), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    }); 
    setShowBanner(false);
    if (hasConsented) {
      console.log(
        "Consentimento dado. Cookies não essenciais podem ser ativados.",
      );
    } else {
      console.log(
        "Consentimento negado. Apenas cookies essenciais serão usados.",
      );
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    // 2. Adicione onOpenChange ao Drawer
    <Drawer open={showBanner} onOpenChange={setShowBanner}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl text-foreground">
            Sua privacidade é importante
          </DrawerTitle>
          <DrawerDescription>
            <span className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg text-foreground md:px-16">
              <LuCookie className="hidden min-w-[80px] md:block" size={80} />
              <span className="px-8 text-left text-foreground">
                Utilizamos cookies para oferecer a melhor experiência em nosso
                site. Ao continuar, você concorda com nossa{" "}
                {/* 3. Envolva o Link com DrawerClose asChild */}
                <DrawerClose asChild>
                  <Link
                    href="/politica-de-privacidade"
                    className="font-bold underline hover:text-primary"
                  >
                    Política de Cookies
                  </Link>
                </DrawerClose>
                .
              </span>
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex-row items-center justify-center gap-4 p-0 pb-4">
          <Button
            onClick={() => handleConsent(false)}
            variant="outline"
            className="w-1/3 md:w-auto"
          >
            Recusar
          </Button>
          <Button
            onClick={() => handleConsent(true)}
            variant="default"
            className="w-1/3 md:w-auto"
          >
            Aceitar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
