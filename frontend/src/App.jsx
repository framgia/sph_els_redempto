import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import NavBar from './components/NavBar';
import useCookie from './hooks/useCookie';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [user, setUser] = useCookie("user");

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <AppContext.Provider value={{ user: user, setUser: setUser }}>
        <BrowserRouter>
          <NavBar />
          <AppRoutes/>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
