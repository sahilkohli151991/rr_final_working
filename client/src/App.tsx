import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MouseTracker } from "@/components/MouseTracker";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Preloader from "@/components/Preloader";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import "@/components/Preloader.css";

import PaymentSuccess from "@/pages/payment-success";
import PaymentCancel from "@/pages/payment-cancel";
import ProgramsPage from "@/pages/ProgramsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/programs" component={ProgramsPage} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/payment-cancel" component={PaymentCancel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading or wait for actual app resources if needed
    const t = setTimeout(() => setLoading(false), 3200); // matches preloader animation duration
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <CurrencyProvider>
              <MouseTracker />
              <Toaster />
              <Router />
            </CurrencyProvider>
          </TooltipProvider>
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;
