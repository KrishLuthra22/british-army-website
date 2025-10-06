import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./components/Layout";

import Calendar from "./pages/Calendar";
import Results from "./pages/Results";
import BAOC from "./pages/BAOC";
import AOA from "./pages/AOA";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import News from "./pages/News";
import Gallery from "./pages/Gallery";

import AdminLogin from "./pages/AdminLogin";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/results" element={<Results />} />
                <Route path="/baoc" element={<BAOC />} />
                <Route path="/aoa" element={<AOA />} />
                <Route path="/news" element={<News />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/gallery" element={<Gallery />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
