import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard"/>} />
          <Route path="dashboard" element={<><p className="text-black">Dashboard</p></>} />
          <Route path="categories" element={<><p className="text-black">Categories</p></>} />
          <Route path="sign-up" element={<><p className="text-black">Sign Up</p></>} />
          <Route path="login" element={<><p className="text-black">Login</p></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
