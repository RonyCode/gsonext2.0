"use client";

import React, { useState, useEffect } from "react";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import { GetTokenCookie } from "@/functions/TokenManager";
import { Button } from "@/ui/button";
import Link from "next/link";
import { Home, Loader } from "lucide-react";

hljs.registerLanguage("json", json);

type LogEntry = {
  timestamp: string;
  channel: string;
  level: "info" | "error" | "critical" | "debug";
  message: string;
  context: object;
};

const levelClasses = {
  info: "border-l-sky-500",
  error: "border-l-red-500 bg-red-900/20",
  critical: "border-l-red-600 bg-red-900/40 font-bold",
  debug: "border-l-purple-500",
};

export default function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    const token = await GetTokenCookie("token");
    setIsLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_GSO + "/services/logs?lines=50";
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
      const data: LogEntry[] = await response.json();
      setLogs(data.reverse());
      setError(null);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } catch (err: never) {
      console.error("Erro ao buscar logs:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar a visualização
  const handleClearLogs = () => {
    setLogs([]);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [logs]);

  return (
    <div className="flex h-screen flex-col bg-gray-900 font-mono text-gray-200">
      {/* Barra de Ferramentas */}
      <header className="sticky top-0 z-10 border-b border-gray-700 bg-gray-950/80 p-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-white">Logs do Worker</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="m-0 flex items-center gap-2 rounded-md border border-foreground/15 p-1 transition-colors hover:bg-gray-800/50"
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <Home size={28} />
              )}
            </Link>
            <Button
              onClick={fetchLogs}
              disabled={isLoading}
              variant="secondary"
            >
              {isLoading ? "Carregando..." : "Atualizar Agora"}
            </Button>
            <Button onClick={handleClearLogs} variant="destructive">
              Limpar Visualização
            </Button>
          </div>
        </div>
      </header>

      {/* Container de Conteúdo dos Logs */}
      <main className="flex-grow overflow-y-auto p-4 md:p-6">
        {isLoading && logs.length === 0 && (
          <p className="text-center text-gray-400">Carregando logs...</p>
        )}
        {error && (
          <p className="text-center text-red-500">
            Erro ao carregar logs: {error}
          </p>
        )}

        {!isLoading && !error && logs.length === 0 && (
          <p className="text-center text-gray-400">
            Nenhum log para exibir. A tela foi limpa ou não há atividade.
          </p>
        )}

        {logs.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 border-l-4 p-2 transition-colors hover:bg-gray-800/50 ${levelClasses[entry.level] || "border-l-gray-500"}`}
          >
            <div className="flex flex-wrap items-baseline">
              <span className="mr-4 text-gray-500">[{entry.timestamp}]</span>
              <span className={`mr-4 font-bold uppercase`}>{entry.level}:</span>
              <span className="text-gray-100">{entry.message}</span>
            </div>
            {Object.keys(entry.context).length > 0 && (
              <pre className="mt-3 rounded-md border border-gray-700 bg-black/20 p-3">
                <code className="language-json">
                  {JSON.stringify(entry.context, null, 2)}
                </code>
              </pre>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
