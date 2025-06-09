"use client";
import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";

import React, { useEffect } from "react";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

const DataColumns = ({
  idCompany,
  idCorporation,
}: {
  idCompany: string;
  idCorporation: string;
}) => {
  const [companies, setCompanies] = React.useState<IUnidadeSchema[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data } = await GetAllCompaniesAction(idCorporation);
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

export default DataColumns;
