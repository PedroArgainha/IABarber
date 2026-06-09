import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg px-6 text-center">
      <div className="max-w-md">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl md:text-5xl text-white">Página não encontrada</h1>
        <p className="mt-3 text-text-secondary">
          A página que procuras não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl text-white">Algo correu mal</h1>
        <p className="mt-2 text-text-secondary">
          Tenta recarregar a página. Se persistir, volta a entrar mais tarde.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >Tentar novamente</button>
          <a href="/" className="btn-outline">Voltar ao início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a0a0a" },
      { title: "777 HairVision — Vê o teu novo corte antes de cortar" },
      { name: "description", content: "Envia uma selfie, escolhe o estilo e a nossa IA mostra-te como ficas em segundos. Sem surpresas na cadeira do barbeiro." },
      { property: "og:title", content: "777 HairVision" },
      { property: "og:description", content: "Simula o teu próximo corte de cabelo com IA. Grátis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" },
      { rel: "icon", href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23b5f542'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='monospace' font-weight='900' font-size='14' fill='%230a0a0a'%3E777%3C/text%3E%3C/svg%3E" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <main><Outlet /></main>
    </QueryClientProvider>
  );
}
