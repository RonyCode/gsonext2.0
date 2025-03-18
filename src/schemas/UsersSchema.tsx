import { AccountUserSchema } from "./AccountUserSchema";
import { AddressSchema } from "./AddressSchema";
import { AuthUserSchema } from "./AuthUserSchema";
import { ProfileSchema } from "./ProfileSchema";
import { TokenSchema } from "./TokenSchema";
import { z } from "zod";

export const UserSchema = z.object({
  _id: z.object({ $oid: z.string() }).optional(),
  id_member: z.string().optional(),
  id: z
    .string()
    .min(1, {
      message: "id inválido deve conter no mínimo 1 caracteres",
    })
    .optional()
    .nullable(),
  auth: AuthUserSchema.optional().nullable(),
  account: AccountUserSchema.optional().nullable(),
  address: AddressSchema.optional().nullable(),
  profile: ProfileSchema.optional().nullable(),
  token: TokenSchema.optional().nullable(),
  excluded: z.number().optional().nullable(),
});

export type IUserSchema = z.infer<typeof UserSchema>;
