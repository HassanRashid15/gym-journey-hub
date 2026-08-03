import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Preloader from "./components/Preloader";
import SeoManager from "./components/SeoManager";
import Index from "./pages/Index";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import Membership from "./pages/Membership";
import Trainers from "./pages/Trainers";
import TrainerDetail from "./pages/TrainerDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Preloader />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SeoManager />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/:id" element={<ClassDetail />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/:id" element={<EquipmentDetail />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/trainers/:id" element={<TrainerDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
