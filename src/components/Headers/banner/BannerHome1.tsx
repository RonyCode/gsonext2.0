"use client";
import React, { type ReactElement, useEffect, useState } from "react";
import Logo from "@/img/Logo";

const BannerHome1 = (): ReactElement => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Ajusta a visibilidade baseada na posição da rolagem
      if (scrollPosition > viewportHeight * 0.6) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Esconde completamente após 100vh
      if (scrollPosition > viewportHeight) {
        setShouldHide(true);
      } else {
        setShouldHide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`"transition-all duration-1000 ease-out ${shouldHide ? "pointer-events-none opacity-0" : isVisible ? "opacity-100" : "opacity-30"} fixed h-full w-full bg-[20%_0%] bg-no-repeat brightness-75 md:grid md:w-[80vw] md:grid-cols-2 md:place-content-center md:place-items-center md:bg-cover md:bg-[0%_0%]`}
      style={{
        backgroundImage: "url(/images/banner.jpg)",
        transform: shouldHide ? "translateY(-10%)" : "translateY(0)",
      }}
    >
      <div
        className={`flex flex-col place-items-center items-center justify-center gap-y-3 rounded-md p-4 tracking-tight text-[#f2f2f2] antialiased transition-all delay-100 duration-1000 md:col-start-2 md:grid md:max-w-xl md:shadow-2xl ${shouldHide ? "translate-y-10 opacity-0" : isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-30"} `}
      >
        <span>
          <Logo width={156} />
        </span>
        <h1 className="text-center text-5xl font-bold md:text-4xl">
          <p className=" ">Gestão de Serviços e Operações</p>
        </h1>
        <p className="max-w-prose text-center text-lg leading-none">
          Ocorrências Sob Controle, Soluções em um Toque: Nosso App de
          Gerenciamento, Transformando Desafios em{" "}
          <span className="text-4xl font-bold text-primary">Resultados!</span>
        </p>
      </div>
    </div>
  );
};

export default BannerHome1;
