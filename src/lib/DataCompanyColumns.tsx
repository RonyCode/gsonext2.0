"use client";
import { getAllCompanies } from "@/lib/getAllCompanies";
import React, { useEffect } from "react";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

const DataCompanyColumns = ({
  idCompany,
  idCorporation,
}: {
  idCompany: string;
  idCorporation: string;
}) => {
  const [companies, setCompanies] = React.useState<IUnidadeSchema[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data } = await getAllCompanies(idCorporation);
      setCompanies(data as IUnidadeSchema[]);
    };
    fetchCompanies();
    return () => {
      setCompanies([]);
    };
  }, [idCorporation]);

  const company = companies?.find((company) => company.id === idCompany);

  return <>{company?.name || "N/A"}</>;
};

export default DataCompanyColumns;
