"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { LuCamera, LuCircleCheck } from "react-icons/lu";

import LoadingPage from "../Loadings/LoadingPage";
import { cn } from "@/lib/utils";
import { FileSchema, type IFileSchema } from "@/schemas/FileSchema";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosProgressEvent } from "axios";
import { toast } from "@/hooks/use-toast";
import { GetTokenCookie } from "@/functions/TokenManager";
import { getValidImageUrl } from "@/functions/checkImageUrl";

type EditPhotoProps = {
  className?: string;
  directoryFile?: string;
  disabled?: boolean;
  updateFormExternal?: UseFormReturn;
} & React.ComponentProps<typeof Dialog>;

export const EditPhoto = ({
  className,
  directoryFile,
  updateFormExternal,
  ...props
}: EditPhotoProps) => {
  const [pending, startTransition] = useTransition();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [percent, setPercent] = useState<number | null>(0);
  const router = useRouter();

  const form = useForm<IFileSchema>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(FileSchema),
    defaultValues: {
      file_image: null,
      file_pdf: null,
    },
  });

  const fileRef = form.register("file_image");

  const handleSubmit = (data: IFileSchema): void => {
    startTransition(async () => {
      const token = await GetTokenCookie("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_GSO}/services/upload`,
        { file: data.file_image, directoryFile },
        {
          onUploadProgress,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.status !== 202) {
        toast({
          variant: "danger",
          title: "Algo deu errado! 🤯 ",
          description:
            "Foto de usuário não atualizada, verifique tamanho ou extensão de arquivo enviado",
        });
      }

      if (response?.status === 202) {
        setOpen(false);
        handleResetValues();
        updateFormExternal?.setValue("image", response.data.data);
        const imageUrlPromisse = getValidImageUrl(response.data.data);
        imageUrlPromisse.then((item) => {
          setPreviewUrl(item);
        });

        router.refresh();
        toast({
          variant: "success",
          title: "Ok! Arquivo carregado! 🚀 ",
          description: "Arquivo pronto para ser salvo.",
        });
      }
    });
  };

  const onUploadProgress = (progressEvent: AxiosProgressEvent): void => {
    const { loaded, total } = progressEvent;
    if (total == null) return;
    const percent = Math.floor((loaded * 100) / total);
    setPercent(percent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);

    if (previewUrl != null) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file != null) {
      const url = URL.createObjectURL(file);
      const imageUrlPromisse = getValidImageUrl(url);
      imageUrlPromisse.then((item) => {
        setPreviewUrl(item);
      });
    } else {
      setPreviewUrl(null);
    }
  };

  const handleResetValues = (): void => {
    setFile(null);
    setPercent(0);
    setPreviewUrl(null);
    form.resetField("file_image");
  };

  useEffect(() => {
    // Ensure userImage is null if session?.user?.image is undefined or null
    const userImage = directoryFile || null;
    const imageUrlPromisse = getValidImageUrl(userImage);
    imageUrlPromisse.then((item) => {
      setPreviewUrl(item);
    });
    // Use the same expression for the dependency
  }, [directoryFile]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="relative mb-2 h-44 w-full rounded-sm border border-foreground/30 md:m-0 md:h-60">
            <div className="absolute -left-3 -top-3 z-10">
              <LuCamera className="z-10 h-9 w-9 rounded-full border-2 border-foreground/30 bg-accent/50 p-1 text-foreground/50 backdrop-blur hover:border-foreground hover:text-foreground" />
            </div>
            <Image
              src={previewUrl ?? "/images/avatar.svg"}
              quality="100"
              priority={true}
              fill
              sizes="100"
              alt="image"
              className="rounded-[5px] object-cover brightness-[80%]"
            />
            ,
          </div>
        </DialogTrigger>

        <DialogContent className={cn("w-full md:w-7/12", className)} {...props}>
          <DialogHeader>
            <DialogTitle>Alterar imagem</DialogTitle>
            <DialogDescription>
              Selecione um arquivo que não seja maior que 2MB{" "}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <LoadingPage pending={pending} />
            <Form {...form}>
              <form className="w-full">
                <FormField
                  control={form.control}
                  name="file_image"
                  render={() => {
                    return (
                      <FormItem>
                        <FormLabel>Arquivo</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder="shadcn"
                            {...fileRef}
                            onChange={handleChange}
                            disabled={percent === 100}
                            accept={"image/*"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {previewUrl != null && file != null && (
                  <div className="mt-3 w-full rounded-2xl">
                    {file.type.startsWith("image/") ? (
                      <Image
                        src={previewUrl}
                        width={0}
                        height={0}
                        alt="Selecione um arquivo"
                        style={{
                          width: "100%",
                          height: "60vh",
                          objectFit: "contain",
                        }}
                      />
                    ) : null}

                    <div className="mt-3 flex w-full items-center gap-1 rounded-full bg-background">
                      <div
                        className="rounded-full bg-primary p-0.5 text-center text-sm font-medium leading-none text-foreground"
                        style={{ width: percent + "%" }}
                      >
                        {percent != null && percent <= 100 && `${percent}%`}
                      </div>

                      <span className="stroke-2 text-green-500">
                        {percent === 100 && <LuCircleCheck size={21} />}
                      </span>
                    </div>
                  </div>
                )}
                {percent === 100 ? (
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={handleResetValues}
                      className="float-end mt-4"
                      disabled={pending || file == null}
                      variant="default"
                    >
                      Fechar
                    </Button>
                  </DialogClose>
                ) : (
                  <Button
                    onClick={form.handleSubmit(async (data) => {
                      handleSubmit(data);
                    })}
                    type="button"
                    variant="default"
                    className="float-end mt-4"
                    disabled={pending || file == null}
                  >
                    Upload
                  </Button>
                )}{" "}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
