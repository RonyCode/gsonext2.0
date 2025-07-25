import React from "react";
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  Layers,
  ShieldCheck,
  Users,
  Star,
  TrendingUp,
  Zap,
  MessageSquare,
} from "lucide-react";
import BannerHome1 from "@/components/Headers/banner/BannerHome1";
import BannerHome2 from "@/components/Headers/banner/BannerHome2";

// --- COMPONENTES PLACEHOLDER ---
// Estes componentes simulam os seus componentes reais do projeto.
// Eles foram desenhados para se adaptar ao tema escuro do Shadcn UI.

const BannerHome = () => (
  <div className="flex min-h-screen items-center justify-center bg-background text-center text-foreground">
    <div>
      <BannerHome1 />
    </div>
  </div>
);

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto w-full max-w-screen-xl px-4 md:px-8 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  className,
  size,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  size?: string;
  variant?: "outline" | "default";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const sizeClasses = size === "lg" ? "h-12 px-8" : "h-10 px-4 py-2";
  const variantClasses =
    variant === "outline"
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

// --- FIM DOS COMPONENTES PLACEHOLDER ---

// --- NOVOS COMPONENTES DE UI PARA ESTA PÁGINA ---

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="group transform rounded-2xl border border-border/50 bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
      {icon}
    </div>
    <h3 className="mb-3 text-xl font-bold text-card-foreground">{title}</h3>
    <p className="leading-relaxed text-muted-foreground">{description}</p>
  </div>
);

const BenefitItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-muted-foreground">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  stars,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  stars: number;
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 shadow-lg">
    <div className="mb-4 flex">
      {[...Array(stars)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
      ))}
    </div>
    <p className="flex-grow italic text-muted-foreground">"{quote}"</p>
    <div className="mt-6">
      <p className="font-semibold text-card-foreground">{author}</p>
      <p className="text-sm text-muted-foreground">
        {role}, {company}
      </p>
    </div>
  </div>
);

// --- PÁGINA PRINCIPAL PROFISSIONALMENTE REDESENHADA ---

export default function HomePageRedesigned() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* SEU BANNER PRINCIPAL (MANTIDO) */}
      <header className="relative z-0">
        <div className="flex min-h-screen items-center justify-center bg-background text-center text-foreground">
          <BannerHome1 />
        </div>
      </header>
      <BannerHome2 />

      <main className="flex-1">
        {/* SEÇÃO "POR QUE GSO?" */}
        <section id="why-gso" className="bg-background py-20 lg:py-32">
          <MaxWidthWrapper>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Coluna de Texto */}
              <div className="space-y-8">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  A Solução Completa para Sua Operação
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                  Eleve sua Gestão Operacional a um Novo Patamar
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  O GSO é mais que um sistema: é o seu parceiro estratégico para
                  otimizar processos, garantir a segurança e maximizar a
                  eficiência da sua equipe e recursos.
                </p>
                <div className="space-y-6 pt-4">
                  <BenefitItem
                    icon={<Zap size={20} />}
                    title="Eficiência Acelerada"
                    description="Automatize tarefas manuais e otimize a alocação de recursos para focar no que realmente importa."
                  />
                  <BenefitItem
                    icon={<ShieldCheck size={20} />}
                    title="Segurança Robusta"
                    description="Proteja seus dados com controle de acesso granular e criptografia de ponta a ponta."
                  />
                  <BenefitItem
                    icon={<TrendingUp size={20} />}
                    title="Decisões Inteligentes"
                    description="Transforme dados brutos em insights acionáveis com nossos relatórios e dashboards intuitivos."
                  />
                </div>
                <div className="pt-6">
                  <Button size="lg" className="group">
                    Agendar Demonstração
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              {/* Coluna Visual com Simulação de Dashboard */}
              <div className="relative flex h-[550px] items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 via-secondary/10 to-background blur-2xl"></div>
                <div className="relative h-full w-full max-w-md rounded-2xl border border-border/70 bg-card/50 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground">
                      Dashboard Operacional
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                      <span className="h-3 w-3 rounded-full bg-green-500"></span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="mb-1 text-sm text-muted-foreground">
                        Ocorrências Ativas
                      </p>
                      <p className="text-3xl font-bold text-primary">17</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="mb-1 text-sm text-muted-foreground">
                          Equipes em Campo
                        </p>
                        <p className="text-3xl font-bold text-foreground">8</p>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="mb-1 text-sm text-muted-foreground">
                          Eficiência
                        </p>
                        <p className="text-3xl font-bold text-green-500">98%</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        Performance Semanal
                      </p>
                      <div className="w-full rounded-lg bg-secondary p-4">
                        <div className="flex h-24 items-end gap-2">
                          {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm bg-primary/70 transition-colors hover:bg-primary"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>

        {/* SEÇÃO DE RECURSOS */}
        <section id="recursos" className="bg-secondary py-20 lg:py-32">
          <MaxWidthWrapper className="text-center">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Recursos Poderosos
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Ferramentas Construídas para o Sucesso
            </h2>
            <p className="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
              Explore os pilares do GSO que capacitam sua equipe a alcançar a
              excelência operacional todos os dias.
            </p>
            <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Layers size={28} />}
                title="Gestão de Ocorrências"
                description="Registre, priorize e acompanhe cada incidente em tempo real. Tenha um histórico completo e garanta que nada seja perdido."
              />
              <FeatureCard
                icon={<Users size={28} />}
                title="Escalas Inteligentes"
                description="Crie e gerencie escalas de trabalho de forma eficiente. Otimize a alocação de pessoal e evite conflitos de agendamento."
              />
              <FeatureCard
                icon={<BarChart size={28} />}
                title="Relatórios e Análises"
                description="Gere relatórios detalhados e visualize dados em dashboards interativos para tomar decisões estratégicas com confiança."
              />
            </div>
          </MaxWidthWrapper>
        </section>

        {/* SEÇÃO DE DEPOIMENTOS */}
        <section id="depoimentos" className="bg-background py-20 lg:py-32">
          <MaxWidthWrapper className="text-center">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Confiança Comprovada
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              O que Nossos Clientes Dizem
            </h2>
            <p className="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
              Empresas líderes confiam no GSO para otimizar suas operações
              diárias.
            </p>
            <div className="grid grid-cols-1 gap-8 text-left lg:grid-cols-3">
              <TestimonialCard
                stars={5}
                quote="O GSO revolucionou nossa forma de gerenciar ocorrências. A visibilidade em tempo real nos deu um controle que não tínhamos antes."
                author="Carlos Mendes"
                role="Diretor de Operações"
                company="LogiMax"
              />
              <TestimonialCard
                stars={5}
                quote="A implementação foi surpreendentemente rápida e o suporte é excepcional. A otimização de escalas economizou horas de trabalho administrativo."
                author="Ana Souza"
                role="Gerente de RH"
                company="SeguraCorp"
              />
              <TestimonialCard
                stars={5}
                quote="Os relatórios são o ponto alto para nós. Conseguimos identificar gargalos e melhorar nossa eficiência em mais de 30% em apenas seis meses."
                author="Ricardo Faria"
                role="CEO"
                company="Vigilância Total"
              />
            </div>
          </MaxWidthWrapper>
        </section>

        {/* SEÇÃO DE CTA FINAL */}
        <section id="cta" className="bg-secondary py-20 lg:py-32">
          <MaxWidthWrapper>
            <div className="rounded-2xl border border-border/50 bg-card p-12 text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Pronto para Transformar sua Gestão Operacional?
              </h2>
              <p className="mx-auto mb-8 mt-4 max-w-2xl text-lg text-muted-foreground">
                Agende uma demonstração personalizada e sem compromisso.
                Descubra na prática como o GSO pode se adaptar às necessidades
                da sua empresa e gerar resultados imediatos.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="group">
                  Solicitar Demonstração Gratuita
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  <MessageSquare className="mr-2 h-5 w-5" /> Falar com um
                  Consultor
                </Button>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      </main>

      {/*/!* RODAPÉ *!/*/}
      {/*<footer className="border-t border-border bg-background">*/}
      {/*  <MaxWidthWrapper className="py-12">*/}
      {/*    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">*/}
      {/*      <div className="md:col-span-2">*/}
      {/*        <h3 className="text-xl font-bold text-foreground">GSO</h3>*/}
      {/*        <p className="mt-2 max-w-sm text-muted-foreground">*/}
      {/*          A plataforma definitiva para gestão de serviços e operações.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <h4 className="font-semibold text-foreground">Produto</h4>*/}
      {/*        <ul className="mt-4 space-y-2">*/}
      {/*          <li>*/}
      {/*            <a*/}
      {/*              href="#why-gso"*/}
      {/*              className="text-muted-foreground hover:text-primary"*/}
      {/*            >*/}
      {/*              Visão Geral*/}
      {/*            </a>*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <a*/}
      {/*              href="#recursos"*/}
      {/*              className="text-muted-foreground hover:text-primary"*/}
      {/*            >*/}
      {/*              Recursos*/}
      {/*            </a>*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <a*/}
      {/*              href="#depoimentos"*/}
      {/*              className="text-muted-foreground hover:text-primary"*/}
      {/*            >*/}
      {/*              Clientes*/}
      {/*            </a>*/}
      {/*          </li>*/}
      {/*        </ul>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <h4 className="font-semibold text-foreground">Empresa</h4>*/}
      {/*        <ul className="mt-4 space-y-2">*/}
      {/*          <li>*/}
      {/*            <a*/}
      {/*              href="#"*/}
      {/*              className="text-muted-foreground hover:text-primary"*/}
      {/*            >*/}
      {/*              Sobre Nós*/}
      {/*            </a>*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <a*/}
      {/*              href="#"*/}
      {/*              className="text-muted-foreground hover:text-primary"*/}
      {/*            >*/}
      {/*              Carreiras*/}
      {/*            </a>*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <a*/}
      {/*              href="#"*/}
      {/*              className="text-muted-foreground hover:text-primary"*/}
      {/*            >*/}
      {/*              Contato*/}
      {/*            </a>*/}
      {/*          </li>*/}
      {/*        </ul>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="mt-12 border-t border-border/50 pt-8 text-center">*/}
      {/*      <p className="text-sm text-muted-foreground">*/}
      {/*        &copy; {new Date().getFullYear()} GSO. Todos os direitos*/}
      {/*        reservados.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </MaxWidthWrapper>*/}
      {/*</footer>*/}
    </div>
  );
}
