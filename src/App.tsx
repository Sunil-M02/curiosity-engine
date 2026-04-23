import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import ArticlePage from "./pages/ArticlePage";
// AuthorPage removed - brand-led editorial model (no individual authors)
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ContactThankYouPage from "./pages/ContactThankYouPage";
import TermsPage from "./pages/TermsPage";
import WriteForUsPage from "./pages/WriteForUsPage";
import NotFound from "./pages/NotFound";
import { SmoothScroll } from "./components/effects/SmoothScroll";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SmoothScroll />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            {/* Legacy redirect: /category/:slug -> /categories/:slug */}
            <Route path="/category/:slug" element={<CategoryRedirect />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            {/* Author routes removed - brand-led editorial model */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/thank-you" element={<ContactThankYouPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/write-for-us" element={<WriteForUsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
