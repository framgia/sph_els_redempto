import './App.css';
import NavBar from './components/NavBar';
import NoView from './views/NoView';
import Dashboard from './views/dashboard/Dashboard';
import Activities from './components/Activities';
import WordsLearned from './components/WordsLearned';
import Categories from './views/categories/Categories';
import Profile from './views/profile/Profile';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path="/" element={<Navigate replace to="/dashboard/activity" />} />
          <Route path="dashboard" element={<Dashboard/>}>
            <Route index path="activity" element={<Activities/>} />
            <Route index path="history" element={<WordsLearned/>} />
          </Route>
          <Route path="users/:id" element={<Profile/>}>
            <Route index path="activity" element={<Activities/>} />
            <Route index path="history" element={<WordsLearned/>} />
          <Route path="*" element={<NoView />} />
          </Route>
          <Route path="categories" element={<Categories/>} />
          <Route path="sign-up" element={<><p className="text-black">Sign Up</p></>} />
          <Route path="login" element={<><p className="text-black">Login</p></>} />
          <Route path="*" element={<NoView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
