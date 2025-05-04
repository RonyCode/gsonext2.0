import { z } from "zod";

const minimoCaracteresSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const RegisterUserSchema = z
  .object({
    nome: z.string().min(3, {
      message: "nome inválido deve conter no mínimo 3 caracteres",
    }),

    cpf: z
      .string()
      .min(14, {
        message: "Cpf inválido deve ter no min 14 caracteres",
      })
      .max(14, { message: "Cpf inválido deve ter no max 14 caracteres" })
      .refine((cpf: string) => {
        cpf = cpf.replace(/\D+/g, "");
        if (cpf.length !== 11 || !(cpf.match(/(\d)\1{10}/) == null))
          return false;
        const cpfDigits = cpf.split("").map((el) => +el);
        const rest = (count: number): number => {
          return (
            ((cpfDigits
              .slice(0, count - 12)
              .reduce((soma, el, index) => soma + el * (count - index), 0) *
              10) %
              11) %
            10
          );
        };
        return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
      }, "Cpf não existe."),
    endereco: z.string().min(3, {
      message: "endereço inválido deve conter no mínimo 3 caracteres",
    }),
    complemento: z.string().optional(),
    sigla: z.string().optional(),
    numero: z.string().min(1, {
      message: "número inválido deve conter no mínimo 1 caracteres",
    }),
    cep: z.string().min(9, {
      message: "Cep inválido",
    }),
    cidade: z.string().min(1, {
      message: "Cidade inválida deve conter no mínimo 1 caracteres",
    }),
    estado: z.string().min(1, {
      message: "Estado deve conter no mínimo 1 caracteres",
    }),
    bairro: z.string().min(1, {
      message: "Bairro deve conter no mínimo 1 caracteres",
    }),
    confirmaSenha: z.string(),
    telefone: z
      .string()
      .trim()
      .min(15, { message: "Telefone inválido" })
      .trim(),
    data_nascimento: z.string().min(10, {
      message: "Data inválida",
    }),
    email: z.string().email({ message: "Email inválido" }),
    provider: z.string().optional(),
    provider_user_id: z.string().optional(),
    image: z.string().min(1, { message: "Imagem inválido" }).optional(),
    senha: z
      .string()
      .min(8, {
        message:
          "Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra",
      })
      .regex(minimoCaracteresSenha, {
        message:
          "Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra",
      }),
  })
  .refine((data) => data.senha === data.confirmaSenha, {
    message: "Passwords não confere",
    path: ["confirmaSenha"],
  });

export type IRegisterUserSchema = z.infer<typeof RegisterUserSchema>;
