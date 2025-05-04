import { type ReactNode } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

const SuporteAoCliente = (): ReactNode => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Suporte ao Cliente
      </h1>

      {/* Seção de Contato */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="p-6 text-center">
          <FaPhone className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="mb-2 text-xl font-semibold">Telefone</h2>
          <p className="mb-4">Disponível de Segunda a Sexta, 8h às 18h</p>
          <Button variant="outline" className="w-full">
            (XX) XXXX-XXXX
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <FaWhatsapp className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="mb-2 text-xl font-semibold">WhatsApp</h2>
          <p className="mb-4">Atendimento rápido via mensagem</p>
          <Button variant="outline" className="w-full">
            (XX) XXXXX-XXXX
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <FaEnvelope className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="mb-2 text-xl font-semibold">Email</h2>
          <p className="mb-4">Resposta em até 24 horas úteis</p>
          <Button variant="outline" className="w-full">
            suporte@exemplo.com
          </Button>
        </Card>
      </div>

      {/* Perguntas Frequentes */}
      <div className="mb-12">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="mx-auto max-w-2xl">
          <AccordionItem value="item-1">
            <AccordionTrigger>Como posso resetar minha senha?</AccordionTrigger>
            <AccordionContent>
              Para resetar sua senha, clique em "Esqueci minha senha" na tela de
              login e siga as instruções enviadas ao seu email cadastrado.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Qual o horário de atendimento?</AccordionTrigger>
            <AccordionContent>
              Nosso atendimento funciona de segunda a sexta, das 8h às 18h. Para
              suporte emergencial, utilize nosso canal de WhatsApp.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Como atualizar meus dados cadastrais?
            </AccordionTrigger>
            <AccordionContent>
              Acesse seu perfil no painel de controle e clique em "Editar
              Informações" para atualizar seus dados cadastrais.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Informações Adicionais */}
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Ainda precisa de ajuda?</h2>
        <p className="mb-6 text-muted-foreground">
          Nossa equipe está pronta para ajudar você com qualquer dúvida ou
          problema.
        </p>
        <Button className="min-w-[200px]">Abrir Chamado</Button>
      </div>
    </div>
  );
};

export default SuporteAoCliente;
