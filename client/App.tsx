import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Practitioner from "./pages/Practitioner";
import Booking from "./pages/Booking";
import SearchFlow from "./pages/SearchFlow";
import SearchResults from "./pages/SearchResults";
import SelectAudience from "./pages/SelectAudience";
import PractitionerRecruit from "./pages/PractitionerRecruit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Layout from "@/components/site/Layout";
import Placeholder from "@/pages/Placeholder";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
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
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Signup />} />
              <Route path="/mentions-legales" element={<Placeholder />} />
              <Route path="/confidentialite" element={<Placeholder />} />
              <Route path="/cookies" element={<Placeholder />} />
              <Route path="/contact" element={<Placeholder />} />
              <Route path="/faq" element={<Placeholder />} />
              <Route path="/a-propos" element={<Placeholder />} />
              <Route path="/ressources" element={<Placeholder />} />
              <Route path="/praticien/:id" element={<Practitioner />} />
              <Route path="/praticien-recrutement" element={<PractitionerRecruit />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/search/audience" element={<SelectAudience />} />
              <Route path="/search" element={<SearchFlow />} />
              <Route path="/search/results" element={<SearchResults />} />
              <Route path="/booking" element={<Booking />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
