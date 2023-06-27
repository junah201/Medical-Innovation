import { Providers } from '@/shared/Providers';
import { Router } from '@/shared/Router';
import { Popups } from '@/components';

function App() {
  return (
    <>
      <Providers>
        <Popups />
        <Router />
      </Providers>
    </>
  );
}

export default App;
