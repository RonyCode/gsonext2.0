import { z } from "zod";

export const SaveMemberCompanySchema = z.object({
  id_corporation: z.string().min(1, { message: "corporação não selecionada" }),
  id_company: z.string().min(1, { message: "Unidade não selecionada" }),
  id_user: z.string().min(1, { message: "Meembro não selecionado" }),
  id_member: z.string().optional(),
  termo_busca: z.string().optional(),
});

export type ISaveMemberCompanySchema = z.infer<typeof SaveMemberCompanySchema>;
