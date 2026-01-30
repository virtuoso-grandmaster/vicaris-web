import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Sponsorship from "./pages/Sponsorship";
import ChildDetail from "./pages/ChildDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Shopee from "./pages/Shopee";
import ShopeeDetail from "./pages/ShopeeDetail";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Dashboard from "./pages/admin/Dashboard";
import ChildrenList from "./pages/admin/ChildrenList";
import ChildForm from "./pages/admin/ChildForm";
import NewsList from "./pages/admin/NewsList";
import NewsForm from "./pages/admin/NewsForm";
import ProductsList from "./pages/admin/ProductsList";
import ProductForm from "./pages/admin/ProductForm";
import CollectionsList from "./pages/admin/CollectionsList";
import CollectionForm from "./pages/admin/CollectionForm";
import Settings from "./pages/admin/Settings";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/sponsorship/:slug" element={<ChildDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/shopee" element={<Shopee />} />
            <Route path="/shopee/:slug" element={<ShopeeDetail />} />
            <Route path="/donate" element={<Donate />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="children" element={<ChildrenList />} />
              <Route path="children/:id" element={<ChildForm />} />
              <Route path="news" element={<NewsList />} />
              <Route path="news/:id" element={<NewsForm />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="products/:id" element={<ProductForm />} />
              <Route path="products/:productId/collections" element={<CollectionsList />} />
              <Route path="products/:productId/collections/:collectionId" element={<CollectionForm />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
