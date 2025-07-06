import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

const Sidebar = () => {
  const location = window.location.hash.replace('#', '');
  return (
    <aside className="h-screen w-56 bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col shadow-xl">
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <span className="text-2xl font-bold tracking-wide">AI知识库</span>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800/80 text-base font-medium ${location === item.to ? 'bg-gray-800/90 text-blue-400' : 'text-white'}`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-xs text-gray-400 text-center pb-4">© 2024 AI Rag</div>
    </aside>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster 
        position="top-center" 
        offset={{ top: 4 }} 
        richColors 
        className="backdrop-blur-lg" 
        toastOptions={{
          className: `
            bg-gradient-to-br from-blue-700/90 via-indigo-700/80 to-blue-800/90
            dark:from-blue-950/95 dark:via-indigo-950/90 dark:to-blue-900/95
            backdrop-blur-lg border border-white/20 shadow-lg text-white
            rounded-xl transition-all duration-300
            animate-[toast-fade-in_0.5s_ease-out]
          `,
          style: {
            boxShadow: '0 12px 36px -4px rgba(31, 38, 135, 0.28)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255,255,255,0.12)',
            textShadow: '0 1px 2px rgba(0,0,0,0.13)'
          },
        }}
      />
      <style>{`
        @keyframes toast-fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(-16px) scale(0.96); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
      `}</style>
      <HashRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
            </Routes>
          </main>
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
