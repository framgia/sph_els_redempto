import './App.css';
import NavBar from './components/NavBar';
import NoView from './views/NoView';
import Dashboard from './views/dashboard/Dashboard';
import Activities from './components/Activities';
import WordsLearned from './components/WordsLearned';
import Categories from './views/categories/Categories';
import Profile from './views/profile/Profile';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Lessons from './views/lessons/Lessons';
import LessonSplash from './views/lessons/widgets/LessonSplash';
import LessonItem from './views/lessons/widgets/LessonItem';
import LessonReview from './views/lessons/widgets/LessonReview';
import SignUp from './views/authentication/SignUp';
import Login from './views/authentication/Login';
import CategoryEdit from './views/admin/CategoryEdit';
import CategoryAdd from './views/admin/CategoryAdd';
import LessonEdit from './views/admin/LessonEdit';
import WordsEdit from './views/admin/WordsEdit';
import WordEdit from './views/admin/WordEdit';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path="/" element={<Navigate replace to="/dashboard/activity" />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index path="activity" element={<Activities />} />
            <Route path="history" element={<WordsLearned />} />
          </Route>
          <Route path="categories" element={<Categories />} />
          <Route path="lesson" element={<Lessons />}>
            <Route path=":lessonSlug" element={<LessonSplash />}/>
            <Route path=":lessonSlug/review" element={<LessonReview />}/>
            <Route path=":lessonSlug/:itemNo" element={<LessonItem />}/>
          </Route>
          <Route path="users/:id" element={<Profile/>}>
            <Route index path="activity" element={<Activities/>} />
            <Route index path="history" element={<WordsLearned/>} />
          <Route path="*" element={<NoView />} />
          </Route>
          <Route path="categories" element={<Categories/>} />
          <Route path="categories/add" element={<CategoryAdd/>} />
          <Route path="categories/edit" element={<CategoryEdit/>} />
          <Route path="categories/edit/:lessonSlug" element={<LessonEdit/>} />
          <Route path="categories/edit/:lessonSlug/words" element={<WordsEdit/>} />
          <Route path="categories/edit/:lessonSlug/words/:wordId" element={<WordEdit/>} />
          <Route path="sign-up" element={<SignUp/>} />
          <Route path="login" element={<Login/>} />
          <Route path="*" element={<NoView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
