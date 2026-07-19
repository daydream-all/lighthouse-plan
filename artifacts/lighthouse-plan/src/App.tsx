import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import LandingPage from '@/pages/landing';
import Features from '@/pages/features';
import Dashboard from '@/pages/dashboard';
import Guide from '@/pages/guide';
import Assessment from '@/pages/assessment';
import Portrait from '@/pages/portrait';
import Paths from '@/pages/paths';
import Plan from '@/pages/plan';
import Profile from '@/pages/profile';
import Tasks from '@/pages/tasks';
import Records from '@/pages/records';
import Reports from '@/pages/reports';
import Settings from '@/pages/settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/features" component={Features} />
      
      {/* App Routes - handled via individual top-level routes due to wouter flat routing requirement */}
      <Route path="/app" component={Dashboard} />
      <Route path="/guide" component={Guide} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/portrait" component={Portrait} />
      <Route path="/paths" component={Paths} />
      <Route path="/plan" component={Plan} />
      <Route path="/profile" component={Profile} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/records" component={Records} />
      <Route path="/reports" component={Reports} />
      <Route path="/settings" component={Settings} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
