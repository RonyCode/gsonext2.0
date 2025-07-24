import "./globals.css";
import { type Metadata, type Viewport } from "next";
import React, { Suspense } from "react";

import LoadingPage from "@/components/Loadings/LoadingPage";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider/ThemeProvider";
import NotificationsChecker from "@/components/Notification/NotificationsChecker";

const APP_NAME = "GSO";
const APP_DEFAULT_TITLE = "GSO";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

// Mantenha esta importação!
import "highlight.js/styles/monokai-sublime.css";
import PushSubscriptionManager from "@/components/Notification/PushSubscriptionManager";
import { AllowCookie } from "@/components/AllowCookies/AllowCookie";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SideProfileAlertBanner } from "@/components/Sidebar/sideProfileAlertBanner/side-profile-alert-banner";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body
        className={cn(
          "m-0 h-screen min-h-screen w-screen overflow-x-hidden p-0 font-sans antialiased",
          fontSans.variable,
          fontSans.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="flex min-h-screen w-screen flex-col bg-gradient-to-t from-background to-secondary">
              <NotificationsChecker />
              <PushSubscriptionManager />
              <AllowCookie />
              <SideProfileAlertBanner />

              <div className="m-auto h-full w-full">{children}</div>
              <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
              />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
