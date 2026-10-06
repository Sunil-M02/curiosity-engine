import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import GuidesPage from "./pages/GuidesPage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ContactThankYouPage from "./pages/ContactThankYouPage";
import TermsPage from "./pages/TermsPage";
import WriteForUsPage from "./pages/WriteForUsPage";
import NotFound from "./pages/NotFound";

const TopicClusterPage = lazy(() => import("./pages/TopicClusterPage"));
import { SmoothScroll } from "./components/effects/SmoothScroll";

const queryClient = new QueryClient();

const GlobalFavicon = () => (
  <Helmet>
    <link
      rel="icon"
      type="image/png"
      sizes="64x64"
      href="/curiosityfields-favicon-dark.png?v=20261008"
    />
  </Helmet>
);

const CategoryRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/categories/${slug}`} replace />;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <GlobalFavicon />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SmoothScroll />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/category/:slug" element={<CategoryRedirect />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/topics/:slug" element={<Suspense fallback={<div className="container content-rail py-20" aria-hidden="true" />}><TopicClusterPage /></Suspense>} />
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
