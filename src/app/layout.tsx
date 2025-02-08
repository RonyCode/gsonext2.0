import './globals.css'
import { type Metadata, type Viewport } from 'next'
import React, { Suspense } from 'react'

import LoadingPage from '@/components/Loadings/LoadingPage'
import { NavbarMain } from '@/components/Nav/NavbarMain'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'
import { ThemeProvider } from '@/providers/ThemeProvider/ThemeProvider'
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/ui/sidebar";
import {AppSidebar} from "@/components/Sidebar/app-sidebar";
import {Separator} from "@/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/ui/breadcrumb";

const APP_NAME = 'GSO'
const APP_DEFAULT_TITLE = 'GSO'
const APP_TITLE_TEMPLATE = '%s'
const APP_DESCRIPTION = 'Best PWA app in the world!'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body
        className={cn(
          ' m-0 h-screen min-h-screen w-screen  overflow-x-hidden p-0 font-sans antialiased',
          fontSans.variable,
          fontSans.className,
        )}
      >
        <Suspense fallback={<LoadingPage pending={true} />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <div className="flex min-h-screen w-screen flex-col bg-gradient-to-t from-background to-secondary">
                <div className="h-full w-full m-auto">{children}</div>
              </div>
            </Providers>{' '}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
