"use client";

import { motion } from "framer-motion";
import { Button } from "@/ui/button";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export default function AnimatedSections() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <>
      {/* Hero Content */}
      <motion.div
        className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Gestão Operacional Simplificada
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-200">
          Transforme sua operação com nossa plataforma intuitiva, segura e
          colaborativa.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-primary text-white hover:bg-primary/90"
        >
          Comece Agora
        </Button>
      </motion.div>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold tracking-tight">
              Por que escolher o GSO?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Recursos poderosos para otimizar sua operação e impulsionar
              resultados.
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <FaRocket className="h-8 w-8 text-primary" />,
                title: "Produtividade Máxima",
                description:
                  "Automatize processos e aumente a eficiência da sua equipe.",
              },
              {
                icon: <FaShieldAlt className="h-8 w-8 text-primary" />,
                title: "Segurança Avançada",
                description:
                  "Proteja seus dados com criptografia de ponta e conformidade.",
              },
              {
                icon: <FaUsers className="h-8 w-8 text-primary" />,
                title: "Colaboração em Tempo Real",
                description:
                  "Conecte sua equipe com ferramentas colaborativas integradas.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              >
                {feature.icon}
                <div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detailed Section */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-12 text-4xl font-bold tracking-tight">
              Nossos Recursos
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Gestão de Ocorrências",
                description:
                  "Controle total sobre todas as ocorrências com acompanhamento em tempo real e histórico detalhado.",
              },
              {
                title: "Escalas Inteligentes",
                description:
                  "Otimize a distribuição de recursos e pessoal com nosso sistema avançado de escalas.",
              },
              {
                title: "Relatórios Detalhados",
                description:
                  "Tome decisões informadas com relatórios completos e análises estatísticas.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              >
                <Card className="border-none shadow-lg transition-all hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                Sobre o GSO
              </h2>
              <p className="text-lg text-muted-foreground">
                O Sistema de Gestão de Serviços e Operações (GSO) é uma solução
                completa para gerenciamento de operações, desenvolvida para
                otimizar processos, melhorar a eficiência e impulsionar
                resultados.
              </p>
              <Button variant="outline" size="lg" className="mt-6">
                Conheça Nossa História
              </Button>
            </motion.div>
            <motion.div
              className="relative h-[400px] overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
              {/* Placeholder for image */}
              <div className="h-full w-full bg-gray-200" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight">
              Pronto para transformar sua operação?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg">
              Junte-se a milhares de empresas que confiam no GSO para otimizar
              seus processos.
            </p>
            <Button size="lg" variant="secondary" className="mt-8">
              Experimente Gratuitamente
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
