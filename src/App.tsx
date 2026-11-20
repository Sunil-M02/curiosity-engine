import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";

const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const TopicClusterPage = lazy(() => import("./pages/TopicClusterPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ContactThankYouPage = lazy(() => import("./pages/ContactThankYouPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const WriteForUsPage = lazy(() => import("./pages/WriteForUsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function CategoryRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/categories/${slug}`} replace />;
}

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/categories/:slug" element={<CategoryPage />} />
              <Route path="/category/:slug" element={<CategoryRedirect />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/topics/:slug" element={<TopicClusterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact/thank-you" element={<ContactThankYouPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/write-for-us" element={<WriteForUsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
