import "../globals.css";
import React from "react";

import FooterLayout from "@/components/Footer/FooterLayout";
import { NavbarMain } from "@/components/Nav/NavbarMain";
import PushSubscriptionManager from "@/components/Notification/PushSubscriptionManager";
import { AllowCookie } from "@/components/AllowCookies/AllowCookie";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarMain />
      <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-t from-background to-secondary pt-[68px]">
        <div className="h-[calc(100vh_-_68px)] min-h-screen w-full">
          {children} <FooterLayout />
        </div>
      </div>
    </>
  );
}
