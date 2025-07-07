"use client";

import Link from "next/link";
import React from "react";

import SigInForm from "@/app/(auth)/auth/components/SigInForm";
import { SignUpForm } from "@/app/(auth)/auth/components/SignUpForm";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import Logo from "@/img/Logo";

const LoginFormSlice = () => {
  const [sliceLogin, setSliceLoagin] = React.useState<string>(
    "animate-sliceRegister",
  );

  return (
    <>
      <div className="grid h-full w-full grid-cols-1 place-items-center rounded-[8px] lg:h-[60vh] lg:grid-cols-2 lg:grid-rows-1 lg:border lg:border-[var(--border)]">
        <div
          className={`${
            sliceLogin === "animate-sliceRegister"
              ? "hidden h-screen w-full lg:relative lg:col-start-1 lg:col-end-2 lg:block lg:h-full lg:place-content-center lg:place-items-center"
              : "h-screen w-full lg:relative lg:col-start-1 lg:col-end-2 lg:h-full lg:place-content-center lg:place-items-center"
          }`}
        >
          <div className="opacity-1 flex h-full w-full items-center justify-center lg:absolute">
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <Button
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "fixed left-3 top-20 ease-in-out lg:absolute lg:left-3 lg:top-3",
                )}
                onClick={() => {
                  setSliceLoagin("animate-sliceRegister");
                }}
              >
                Cadastre-se
              </Button>
              <div className="justify-self-center">
                <SigInForm />
              </div>
            </div>
          </div>
          <div
            className={`${sliceLogin} rounder d-[8px] relative hidden h-full w-full flex-col rounded-[8px] border-l border-r border-[var(--border)] bg-muted bg-slate-400 text-white dark:border-r lg:z-10 lg:flex`}
          >
            <div className="absolute inset-0 flex flex-col justify-between bg-zinc-900">
              <div className="relative flex items-center justify-center text-lg font-medium">
                <Link href="/" className="z-10 mt-8">
                  <Logo width={128} />
                </Link>
              </div>
              <img
                src={`
                  ${
                    sliceLogin === "animate-sliceLogin"
                      ? "/images/login.jpeg"
                      : "/images/cadastro.webp"
                  }`}
                alt="Authentication"
                className="absolute z-0 h-full w-full rounded-[8px] object-cover brightness-[60%]"
              />
              <div className="relative flex flex-col items-center justify-center">
                <blockquote className="space-y-2 px-4">
                  {sliceLogin === "animate-sliceLogin" ? (
                    <p className="text-lg">
                      &ldquo;Emergências não esperam, e nós também não. Estamos
                      ao seu lado a qualquer momento.&rdquo;
                    </p>
                  ) : (
                    <p className="text-lg">
                      &ldquo;Em situações críticas, cada segundo conta. Nós
                      estamos dedicados a oferecer atendimento de emergência
                      rápido, eficiente e compassivo. Sua segurança é a nossa
                      prioridade número um.&rdquo;
                    </p>
                  )}
                  <footer className="text-sm italic">Anderson Rony</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            sliceLogin === "animate-sliceLogin"
              ? "hidden lg:relative lg:col-start-2 lg:col-end-3 lg:flex lg:h-full lg:w-full"
              : "absolute lg:relative lg:col-start-2 lg:col-end-3 lg:flex lg:h-full lg:w-full"
          }`}
        >
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Crie uma conta
              </h1>
              <p className="text-muted-foreground">
                Digite seu email abaixo para criar sua conta
              </p>
            </div>

            <Button
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "fixed right-3 top-[54px] ease-in-out lg:absolute lg:-top-3 lg:right-3",
              )}
              onClick={() => {
                setSliceLoagin("animate-sliceLogin");
              }}
            >
              Entrar
            </Button>
            <SignUpForm />
            <p className="px-8 text-center text-[0.675rem] font-light text-muted-foreground">
              Ao se cadastrar você concorda com nossos{" "}
              <Link
                href="/src/app/(auth)/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/src/app/(auth)/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Políticas de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginFormSlice;
