import "react-toastify/dist/ReactToastify.css";

import { type Metadata } from "next";
import React from "react";

import BannerHome1 from "@/components/Headers/banner/BannerHome1";
import BannerHome2 from "@/components/Headers/banner/BannerHome2";
import MaxWidthWrapper from "@/components/Pages/MaxWidthWrapper";
import { Button } from "@/ui/button";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

export const metadata: Metadata = {
  title: "GSO | Home",
  description: "Sistema de Gestão Operacional - GSO",
};

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MaxWidthWrapper>
        <div className="flex-1 bg-gradient-to-t from-background to-secondary">
          <header className="z-0 h-full min-h-screen">
            <BannerHome1 />
          </header>

          <BannerHome2 />

          <section className="relative min-h-screen bg-gradient-to-t from-background to-secondary">
            <div className="container mx-auto px-4 py-20">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    Gestão Operacional Simplificada
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Transforme sua operação com nossa plataforma intuitiva e
                    eficiente.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <FaRocket className="h-6 w-6 text-primary" />
                      <span>Aumente a produtividade</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaShieldAlt className="h-6 w-6 text-primary" />
                      <span>Segurança garantida</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaUsers className="h-6 w-6 text-primary" />
                      <span>Colaboração em tempo real</span>
                    </div>
                  </div>
                  <Button size="lg" className="mt-6">
                    Saiba Mais
                  </Button>
                </div>
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
                  {/* Adicione sua imagem aqui */}
                </div>
              </div>
            </div>
          </section>
          <section className="relative z-10 mt-[100vh] w-full bg-background px-6 py-24">
            <div className="container mx-auto">
              <h2 className="mb-12 text-center text-4xl font-bold">
                Nossos Recursos
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Card 1 */}
                <div className="rounded-lg border p-6 shadow-lg transition-all hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold">
                    Gestão de Ocorrências
                  </h3>
                  <p className="text-muted-foreground">
                    Controle total sobre todas as ocorrências, com
                    acompanhamento em tempo real e histórico completo.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-lg border p-6 shadow-lg transition-all hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold">
                    Escalas Inteligentes
                  </h3>
                  <p className="text-muted-foreground">
                    Sistema avançado de gestão de escalas, otimizando a
                    distribuição de recursos e pessoal.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-lg border p-6 shadow-lg transition-all hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold">
                    Relatórios Detalhados
                  </h3>
                  <p className="text-muted-foreground">
                    Geração de relatórios completos e análises estatísticas para
                    tomada de decisões.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Seção Sobre */}
          <section className="w-full bg-primary/5 px-6 py-24">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h2 className="mb-6 text-3xl font-bold">Sobre o GSO</h2>
                  <p className="text-lg text-muted-foreground">
                    O Sistema de Gestão de Serviços e Operações (GSO) é uma
                    solução completa para gerenciamento de operações,
                    desenvolvida para otimizar processos e melhorar a eficiência
                    operacional da sua organização.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
