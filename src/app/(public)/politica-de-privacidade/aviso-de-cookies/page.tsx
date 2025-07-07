import { LuCookie } from "react-icons/lu";
import { DrawerClose } from "@/ui/drawer";
import Link from "next/link";
import React from "react";

const AvisoDeCookies = () => {
  return (
    <>
      <div className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg text-foreground md:px-16">
        <LuCookie className="hidden min-w-[80px] md:block" size={80} />
        <p className="px-8 text-left text-foreground">
          Utilizamos cookies para oferecer a melhor experiência em nosso site.
          Ao continuar, você concorda com nossa{" "}
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
        </p>
      </div>
    </>
  );
};
export default AvisoDeCookies;
