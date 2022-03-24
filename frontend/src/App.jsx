import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import NavBar from './components/NavBar';
import NoView from './views/NoView';
import Dashboard from './views/dashboard/Dashboard';
import Categories from './views/categories/Categories';
import Profile from './views/profile/Profile';
import Lessons from './views/lessons/Lessons';
import LessonQuiz from './views/lessons/widgets/LessonQuiz';
import SignUp from './views/authentication/SignUp';
import Login from './views/authentication/Login';
import CategoryEdit from './views/admin/CategoryEdit';
import CategoryAdd from './views/admin/CategoryAdd';
import LessonEdit from './views/admin/LessonEdit';
import WordsEdit from './views/admin/WordsEdit';
import WordEdit from './views/admin/WordEdit';
import WordAdd from './views/admin/WordAdd';
import useCookie from './hooks/useCookie';

function App() {
  const [user, setUser] = useCookie("user");

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <AppContext.Provider value={{user: user, setUser: setUser}}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route index path="/" element={<Navigate replace to="/dashboard/activity" />} />

            <Route path="dashboard/activity" element={<Dashboard view = "activity" />}/>
            <Route path="dashboard/history" element={<Dashboard view = "history" />}/>
            <Route path="lesson" element={<Lessons />}>
              <Route path=":lessonSlug/quiz" element={<LessonQuiz />} />
            </Route>

            <Route path="users/:id/activity" element={<Profile view = "activity"/>}/>
            <Route path="users/:id/history" element={<Profile view = "history"/>}/>

            <Route path="categories" element={<Categories />} />
            <Route path="categories/add" element={<CategoryAdd />} />
            <Route path="categories/edit" element={<CategoryEdit />} />
            <Route path="categories/edit/:lessonSlug" element={<LessonEdit />} />
            <Route path="categories/edit/:lessonSlug/words" element={<WordsEdit />} />
            <Route path="categories/edit/:lessonSlug/words/add" element={<WordAdd />} />
            <Route path="categories/edit/:lessonSlug/words/:wordId" element={<WordEdit />} />
            
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoView />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
