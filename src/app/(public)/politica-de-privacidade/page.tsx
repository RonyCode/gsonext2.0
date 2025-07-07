// app/politica-de-privacidade/page.tsx

import Logo from "@/icons/Logo";
import { type Metadata } from "next";
import Link from "next/link";
import { LuMail } from "react-icons/lu";

// Metadata para SEO: Ajuda os buscadores a entenderem do que se trata a página.
export const metadata: Metadata = {
  title: "Política de Privacidade | [Nome do Seu Site]",
  description:
    "Entenda como coletamos, usamos e protegemos seus dados pessoais em nosso site.",
};

// Componente da Página de Política de Privacidade
export default function PoliticaDePrivacidadePage() {
  const lastUpdated = "01 de Julho de 2025"; // MANTENHA ESTA DATA ATUALIZADA

  return (
    <div className="bg-gradient-to-t from-background to-secondary text-foreground">
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Usamos a classe 'prose' do Tailwind para uma estilização de texto limpa e legível */}
        <article className="prose prose-lg max-w-full dark:prose-invert">
          <h1>Política de Privacidade</h1>
          <p className="text-sm text-gray-500">
            Última atualização: {lastUpdated}
          </p>
          <h2>1. Introdução</h2>
          <p>
            <span className="flex items-center gap-2">
              Bem-vindo ao <Logo width={80} className="block" />
            </span>{" "}
            Sua privacidade é de extrema importância para nós. Esta Política de
            Privacidade explica como nós, <strong>©RCode</strong>, coletamos,
            usamos, compartilhamos e protegemos suas informações pessoais quando
            você visita nosso site.
          </p>
          <p>
            Ao utilizar nosso site, você concorda com a coleta e uso de
            informações de acordo com esta política.
          </p>

          <h2>2. Coleta de Dados</h2>
          <p>Nós coletamos informações de algumas maneiras diferentes:</p>
          <h3>2.1. Dados que Você nos Fornece Diretamente</h3>
          <p>
            Coletamos informações que você nos fornece voluntariamente, como ao
            preencher um formulário de contato, se inscrever em nossa newsletter
            ou criar uma conta. Esses dados podem incluir:
          </p>
          <ul>
            <li>Nome e sobrenome</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>
              Número do CPF (caso seja uma pessoa física) ou CNPJ (caso seja uma
              pessoa jurídica)
            </li>
            <li>Número de matrícula</li>
            <li>Outros dados pessoais</li>
          </ul>

          <h3>
            2.2. Dados Coletados Automaticamente (Cookies e Tecnologias
            Similares)
          </h3>
          <p>
            Quando você navega em nosso site, coletamos certas informações
            automaticamente do seu dispositivo. Isso inclui:
          </p>
          <ul>
            <li>
              <strong>Cookies:</strong> Pequenos arquivos de texto que
              armazenamos em seu navegador. Conforme informado em nosso{" "}
              <Link href="/politica-de-privacidade/aviso-de-cookies">
                aviso de cookies
              </Link>
              , usamos cookies essenciais para o funcionamento do site e cookies
              analíticos para entender como nosso site é usado e como podemos
              melhorá-lo.
            </li>
            <li>
              <strong>Dados de Análise (Analytics):</strong> Se você consentir,
              usamos ferramentas como o Google Analytics para coletar dados
              sobre sua interação com o site, como as páginas que você visita, o
              tempo que passa nelas, seu endereço IP (anonimizado), tipo de
              navegador e dispositivo.
            </li>
            <li>
              <strong>Dados de Log:</strong> Informações que seu navegador envia
              automaticamente, como seu endereço IP, tipo e versão do navegador,
              e as páginas que você visitou.
            </li>
          </ul>

          <h2>3. Como Usamos Seus Dados</h2>
          <p>Utilizamos os dados coletados para as seguintes finalidades:</p>
          <ul>
            <li>
              <strong>Para operar e manter nosso site:</strong> Garantir que o
              site funcione corretamente.
            </li>
            <li>
              <strong>Para melhorar sua experiência:</strong> Personalizar o
              conteúdo e entender como podemos aprimorar nossos serviços.
            </li>
            <li>
              <strong>Para comunicação:</strong> Responder às suas perguntas,
              enviar e-mails administrativos e newsletters (caso você opte por
              recebê-las).
            </li>
            <li>
              <strong>Para segurança:</strong> Monitorar atividades para
              prevenir fraudes e proteger nosso site.
            </li>
            <li>
              <strong>Para cumprir obrigações legais:</strong> Atender a
              requisições judiciais ou regulatórias.
            </li>
          </ul>

          <h2>4. Compartilhamento de Dados</h2>
          <p>
            Nós não vendemos, alugamos ou trocamos suas informações pessoais com
            terceiros.
          </p>
          <p>
            Podemos compartilhar seus dados com prestadores de serviços que nos
            ajudam a operar nosso negócio, como:
          </p>
          <ul>
            <li>
              <strong>Plataformas de análise:</strong> Como o Google (para o
              Google Analytics).
            </li>
            <li>
              <strong>Provedores de hospedagem:</strong> Que armazenam os dados
              do nosso site.
            </li>
            <li>
              <strong>Ferramentas de e-mail marketing:</strong> Para o envio de
              newsletters.
            </li>
          </ul>
          <p>
            Exigimos que todos os nossos prestadores de serviços respeitem a
            segurança de seus dados e os tratem de acordo com a lei.
          </p>

          <h2>5. Seus Direitos (LGPD)</h2>
          <p>
            De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/18),
            você, como titular dos dados, tem o direito de:
          </p>
          <ul>
            <li>
              <strong>Confirmação e Acesso:</strong> Confirmar a existência de
              tratamento e acessar seus dados.
            </li>
            <li>
              <strong>Correção:</strong> Corrigir dados incompletos, inexatos ou
              desatualizados.
            </li>
            <li>
              <strong>Anonimização, Bloqueio ou Eliminação:</strong> Solicitar a
              anonimização, bloqueio ou eliminação de dados desnecessários ou
              tratados em não conformidade com a LGPD.
            </li>
            <li>
              <strong>Portabilidade:</strong> Solicitar a portabilidade dos seus
              dados para outro fornecedor.
            </li>
            <li>
              <strong>Revogação do Consentimento:</strong> Revogar seu
              consentimento a qualquer momento.
            </li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato conosco através do{" "}
            <strong className="flex items-center gap-2">
              {" "}
              <LuMail /> e-mail: rcode@example.com.
            </strong>
          </p>

          <h2>6. Segurança dos Dados</h2>
          <p>
            A segurança de seus dados é uma prioridade. Empregamos medidas
            técnicas e administrativas, como certificados SSL, firewalls,
            protocolos de autenticação, controle de acesso , para proteger suas
            informações contra acesso não autorizado, alteração, divulgação ou
            destruição.
          </p>

          <h2>7. Alterações nesta Política de Privacidade</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade periodicamente.
            Notificaremos você sobre quaisquer alterações publicando a nova
            política nesta página e atualizando a data de &ldquo;Última
            atualização&ldquo;.
          </p>

          <h2>8. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre esta Política de Privacidade ou
            sobre como tratamos seus dados, por favor, entre em contato conosco:{" "}
            <Link href="/suporte">clique aqui</Link>
          </p>
        </article>
      </main>
    </div>
  );
}
