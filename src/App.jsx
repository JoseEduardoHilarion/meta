import { BrowserRouter } from 'react-router';
import { MetaMemoria } from './servicios/meta/MetaMemoria.jsx';
import { Toaster } from './components/ui/Toaster.jsx';
import { AppRouter } from './routes/AppRouter.jsx';

export function App() {
  return (
    <MetaMemoria>
      <Toaster />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MetaMemoria>
  );
}
