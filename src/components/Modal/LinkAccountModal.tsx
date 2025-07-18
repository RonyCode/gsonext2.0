import * as React from "react";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LuKeyRound,
  LuLoaderCircle,
  LuMail,
  LuUserCheck,
  LuEye,
  LuEyeOff,
  LuFingerprint,
} from "react-icons/lu";

import { IUserSchema } from "@/schemas/UsersSchema";
import { LoginUserAction } from "@/actions/user/LoginUserAction";
import { toast } from "@/hooks/use-toast";
import { UserLogged } from "@/types/index";

const LinkAccountSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z
    .string()
    .min(1, "A senha é obrigatória.") // Adiciona validação para campo vazio
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "A senha deve ter no mínimo 8 caracteres, incluindo uma letra e um número.",
    ),
});

type LinkAccountFormData = z.infer<typeof LinkAccountSchema>;

interface LinkAccountDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  userEmail: IUserSchema | null;
  userCpfEmail: IUserSchema | null;
  onLinkAccount: (data: UserLogged) => void;
}

const AccountFormFields = ({
  control,
  email,
  isPending,
  showPassword,
  setShowPassword,
}: {
  control: Control<LinkAccountFormData>;
  email: string;
  isPending: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) => (
  <>
    {/* Campo de Email (desabilitado, apenas para exibição) */}
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <div className="relative">
              <LuMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...field}
                value={email} // O valor exibido é a prop `email`
                type="email"
                disabled
                className="pl-10 font-medium"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Campo de Senha com toggle de visibilidade */}
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Senha</FormLabel>
          <FormControl>
            <div className="relative">
              <LuKeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                disabled={isPending}
                placeholder="Digite a senha da sua conta original"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <LuEyeOff className="h-5 w-5" />
                ) : (
                  <LuEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </FormControl>
          <div className="text-right">
            <Link
              target="_blank"
              href="/recuperar-senha"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
              tabIndex={-1}
            >
              Esqueci minha senha
            </Link>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export function LinkAccountModal({
  isOpen,
  onOpenChange,
  userEmail,
  userCpfEmail,
  onLinkAccount,
}: LinkAccountDialogProps) {
  const [isPending, startTransition] = React.useTransition();
  const [showPassword, setShowPassword] = React.useState(false);
  const [activeAccordion, setActiveAccordion] = React.useState<string>(
    userCpfEmail?.auth?.email || userEmail?.auth?.email || "",
  );

  const form = useForm<LinkAccountFormData>({
    resolver: zodResolver(LinkAccountSchema),
    defaultValues: {
      email: activeAccordion, // O email padrão do formulário é o accordion ativo
      password: "",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      // Define o primeiro email disponível como o accordion ativo
      const firstAvailableEmail = "";
      setActiveAccordion(firstAvailableEmail);
      form.reset();
      setShowPassword(false); // Garante que a senha esteja sempre oculta ao reabrir
    }
  }, [isOpen, userCpfEmail, userEmail, form]);

  // Efeito para atualizar o valor do email no formulário quando o usuário troca de accordion.
  React.useEffect(() => {
    if (activeAccordion) {
      form.setValue("email", activeAccordion, { shouldValidate: true });
      form.setValue("password", "", { shouldValidate: true });
    }
  }, [activeAccordion, form]);

  const handleSubmit = async (formData: LinkAccountFormData) => {
    startTransition(async () => {
      const response = await LoginUserAction(formData.email, formData.password);

      if (response.code === 202) {
        toast({
          variant: "success",
          title: "Conta validada com sucesso!",
          description: "Seus acessos foram unificados.",
        });
        if (response?.data?.email === userEmail?.auth?.email) {
          onLinkAccount(response?.data as UserLogged);
        }
        if (response?.data?.email === userCpfEmail?.auth?.email) {
          onLinkAccount(response?.data as UserLogged);
        }

        // onOpenChange(false);
      } else {
        toast({
          variant: "danger",
          title: "Falha na Autenticação",
          description:
            response.message || "Verifique sua senha e tente novamente.",
        });
        form.setError("password", {
          message: response.message || "Verifique sua senha e tente novamente.",
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <LuUserCheck className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="pt-2 text-2xl font-bold">
            Conta já existente!
          </DialogTitle>
          <DialogDescription className="pt-2">
            Parece que você já tem uma conta. Para conectar seus acessos,
            confirme com a senha da sua conta original.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 px-6"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={activeAccordion}
              onValueChange={setActiveAccordion}
            >
              {userCpfEmail?.auth?.email &&
                userCpfEmail?.auth?.email !== userEmail?.auth?.email && (
                  <AccordionItem value={userCpfEmail?.auth?.email}>
                    <AccordionTrigger className="text-base">
                      <div className="flex items-center gap-3">
                        <LuFingerprint className="h-5 w-5 text-muted-foreground" />
                        <span>Conta associada ao seu CPF</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <AccountFormFields
                        control={form.control}
                        email={userCpfEmail?.auth?.email}
                        isPending={isPending}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
              {userEmail?.auth?.email && (
                <AccordionItem value={userEmail?.auth?.email}>
                  <AccordionTrigger className="text-base">
                    <div className="flex items-center gap-3">
                      <LuMail className="h-5 w-5 text-muted-foreground" />
                      <span>Conta associada ao seu Email</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <AccountFormFields
                      control={form.control}
                      email={userEmail?.auth?.email}
                      isPending={isPending}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>

            <DialogFooter className="flex-col-reverse gap-2 pt-4 sm:flex-row sm:gap-0">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Voltar
              </Button>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && (
                  <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Vincular Conta
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
