// Em: components/ui/password-input.tsx
import * as React from "react";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LuEye, LuEyeOff, LuKeyRound } from "react-icons/lu";
import Link from "next/link";

interface PasswordInputProps {
  form: UseFormReturn<{ password: string }>;
  name: string;
  label?: string;
  placeholder?: string;
  isPending?: boolean;
}

export function PasswordInput({
  form,
  name,
  label = "Senha",
  placeholder = "Digite sua senha",
  isPending = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <LuKeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                disabled={isPending}
                placeholder={placeholder}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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
  );
}
