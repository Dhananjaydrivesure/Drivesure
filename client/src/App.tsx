import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Messages from "@/pages/Messages";
import CalendarPage from "@/pages/CalendarPage";
import CRM from "@/pages/CRM"; // Import CRM page
import Tasks from "@/pages/Tasks";
import Files from "@/pages/Files";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/crm" component={CRM} /> {/* Add CRM route */}
        <Route path="/messages" component={Messages} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/files" component={Files} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
