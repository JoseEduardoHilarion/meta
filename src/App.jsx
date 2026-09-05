import { BrowserRouter } from 'react-router';
import { MetaMemoria } from './servicios/meta/MetaMemoria.jsx';
import { Toaster } from './components/ui/Toaster.jsx';
import { AppRouter } from './routes/AppRouter.jsx';
import { AuthMemoria } from './servicios/auth/AuthMemoria.jsx';

export function App() {
  return (
    <AuthMemoria>
      <MetaMemoria>
        <Toaster />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </MetaMemoria>
    </AuthMemoria>
  );
}
