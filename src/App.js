import './App.css';
// Components
import Navbar from './components/Navbar/Navbar';
import Router from './Routes/Router'

import { AuthContextProvider } from './context/AuthContext';

function App() {

  return (
    <div>
    <AuthContextProvider>
      <Navbar />
      <Router />
    </AuthContextProvider>
    </div>
  );
}

export default App;
