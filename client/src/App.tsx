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
import "@/components/Preloader.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
            
            <MouseTracker />
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;
