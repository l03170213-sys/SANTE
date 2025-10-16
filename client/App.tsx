import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/site/Layout";
import Placeholder from "@/pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/consulter" element={<Placeholder />} />
            <Route path="/specialites" element={<Placeholder />} />
            <Route path="/tarifs" element={<Placeholder />} />
            <Route path="/aide" element={<Placeholder />} />
            <Route path="/connexion" element={<Placeholder />} />
            <Route path="/inscription" element={<Placeholder />} />
            <Route path="/mentions-legales" element={<Placeholder />} />
            <Route path="/confidentialite" element={<Placeholder />} />
            <Route path="/cookies" element={<Placeholder />} />
            <Route path="/contact" element={<Placeholder />} />
            <Route path="/faq" element={<Placeholder />} />
            <Route path="/a-propos" element={<Placeholder />} />
            <Route path="/ressources" element={<Placeholder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

declare global {
  interface Window {
    __APP_ROOT?: ReturnType<typeof createRoot>;
  }
}

if (!window.__APP_ROOT) {
  window.__APP_ROOT = createRoot(container);
}

window.__APP_ROOT.render(<App />);
