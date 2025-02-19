"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { LuLoaderCircle } from "react-icons/lu";

import { columnsWithCheckboxVehicles } from "@/components/DataTables/DataTableVehicles/columnsWithCheckboxVehicles";
import { DataTableVehicle } from "@/components/DataTables/DataTableVehicles/data-table-vehicle";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { saveVehicleIntoCompany } from "@/lib/saveVehicleIntoCompany";
import { cn } from "@/lib/utils";
import { type IVehicleSchema } from "@/schemas/CarsSchema";
import {
  type ISaveVehicleCompanySchema,
  SaveVehicleCompanySchema,
} from "@/schemas/SaveVehicleCompanySchema";
import type { AddressProps } from "@/types/index";
import { Button, buttonVariants } from "@/ui/button";
import { Card } from "@/ui/card";
import { Form } from "@/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

type VehicleCompanyFormProps = React.HTMLAttributes<HTMLDivElement> & {
  vehicles: IVehicleSchema[];
  idCorporation?: string;
  idCompany?: string;
  states?: AddressProps[] | null;
};

export const VehicleCompanyForm = ({
  vehicles,
  idCorporation,
  idCompany,
}: VehicleCompanyFormProps) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ISaveVehicleCompanySchema>({
    mode: "all",
    resolver: zodResolver(SaveVehicleCompanySchema),

    defaultValues: {
      id_corporation: idCorporation ?? "",
      id_company: idCompany?.split("-")[1],
      id_vehicle: "N/A",
    },
  });
  const handleSubmit = (formData: ISaveVehicleCompanySchema) => {
    if (formData.id_vehicle !== "N/A" && formData.id_corporation !== "") {
      startTransition(async () => {
        const result = await saveVehicleIntoCompany(
          formData.id_corporation,
          formData.id_company,
          formData.id_vehicle,
        );

        if (result?.code !== 202) {
          toast({
            variant: "danger",
            title: "Erro ao salvar veiculo na unidade! 🤯 ",
            description: result?.message,
          });
        }
        if (result?.code === 202) {
          toast({
            variant: "success",
            title: "Ok! veiculo salvo com sucesso! 🚀",
            description: "Tudo certo veiculo salvo na unidade",
          });
          redirect(`/servicos/unidades/${idCompany}/veiculos`);
        }
      });
    }
  };
  const handleCheckValidateForm = () => {
    if (form.getValues("id_vehicle") === "N/A") {
      toast({
        variant: "danger",
        title: "Erro ao salvar veiculo na unidade! 🤯 ",
        description: "Veículo não selecionado!",
      });
    }
  };
  const handleCheckboxChange = (value: string): void => {
    form.setValue("id_vehicle", value);
  };

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0" className="p-2 md:p-10">
        <div className="flex items-center pb-10">
          <div className="flex w-full items-center justify-between space-y-2">
            <h1 className="mr-auto text-xl font-bold">
              Salvar Veículo na Unidade
            </h1>
          </div>
        </div>
        <div>
          <Form {...form}>
            <LoadingPage pending={pending} />
            <form
              onSubmit={form.handleSubmit((data) => {
                handleSubmit(data);
              })}
              className="w-full space-y-4"
            >
              {vehicles !== null && (
                <DataTableVehicle
                  columns={columnsWithCheckboxVehicles(handleCheckboxChange)}
                  data={vehicles}
                />
              )}

              <div className="flex w-full flex-col justify-end gap-2 md:flex-row">
                <Button
                  onClick={() => {
                    router.back();
                  }}
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "w-full animate-fadeIn md:w-auto",
                  )}
                  type="button"
                >
                  voltar
                </Button>
                <Button
                  onClick={handleCheckValidateForm}
                  variant="default"
                  type="submit"
                >
                  {pending && (
                    <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
};
export default VehicleCompanyForm;
