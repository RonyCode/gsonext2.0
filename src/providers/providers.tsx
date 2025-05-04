"use client";
import NextTopLoader from "nextjs-toploader";
import React from "react";

import AuthProvider from "./AuthProviders/AuthProvider";
import ToastProvider from "./ToastProvider/ToastProvider";
import InitializeStores from "@/stores/initializeStores";
import { Toaster } from "@/ui/toaster";
import { APIProvider } from "@/providers/ApiProviders/ApiProviders";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <NextTopLoader
          color="#e11d48"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #e11d48,0 0 5px #e11d48"
        />
        <InitializeStores />
        <APIProvider>{children}</APIProvider>
      </ToastProvider>
      <Toaster />
    </AuthProvider>
  );
};
