"use client";
import React, { type ReactElement, useState } from "react";
import { LuCookie } from "react-icons/lu";

import { Button } from "@/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/ui/drawer";

export const AllowCookie = (): ReactElement => {
  const [show, setShow] = useState(true);

  const handleClick = (): void => {
    void Notification.requestPermission();

    setShow(false);
  };

  return (
    <>
      <Drawer open={show}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl text-foreground">
              Este site utiliza cookies
            </DrawerTitle>

            <DrawerDescription>
              <div className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg text-foreground md:px-16">
                <LuCookie className="hidden min-w-[80px] md:block" size={80} />
                <p className="px-8 text-foreground">
                  Este site usa cookies e tecnologias afins, que são pequenos
                  arquivos ou trechos de texto baixados para um aparelho quando
                  o visitante acessa um site ou app. Clique em aceitar para
                  continuar acessando o site.
                </p>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="p-0 pb-4">
            <DrawerClose>
              <Button onClick={handleClick} variant="default" className="mb-4">
                Aceitar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
