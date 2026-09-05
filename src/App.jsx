import { BrowserRouter } from 'react-router';
import { Memoria } from './servicios/meta/Memoria.jsx';
import { Toaster } from './components/ui/Toaster.jsx';
import { AppRouter } from './routes/AppRouter.jsx';

export function App() {
  return (
    <Memoria>
      <Toaster />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Memoria>
  );
}
