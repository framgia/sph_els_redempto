import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NoView from '../views/NoView';
import Dashboard from '../views/dashboard/Dashboard';
import Categories from '../views/categories/Categories';
import Profile from '../views/profile/Profile';
import Lessons from '../views/lessons/Lessons';
import LessonQuiz from '../views/lessons/widgets/LessonQuiz';
import SignUp from '../views/authentication/SignUp';
import Login from '../views/authentication/Login';
import CategoryEdit from '../views/admin/CategoryEdit';
import CategoryAdd from '../views/admin/CategoryAdd';
import LessonEdit from '../views/admin/LessonEdit';
import WordsEdit from '../views/admin/WordsEdit';
import WordEdit from '../views/admin/WordEdit';
import WordAdd from '../views/admin/WordAdd';
import EditProfile from '../views/profile/EditProfile';
import Users from '../views/users/Users';
import ProtectedRoute from '../helper/ProtectedRoute';
import Splash from '../views/splash/Splash';
import { AppContext } from '../context/AppContext';

const AppRoutes = () => {
    const context = useContext(AppContext)
    const user = JSON.parse(context.user)

    return (
        <Routes>
            <Route index path="/" element={<Splash />} />

            <Route path="dashboard/activity" element={
                <ProtectedRoute user={user} isAllowed={user != null}>
                    <Dashboard view="activity" />
                </ProtectedRoute>
            } />
            <Route path="dashboard/history" element={
                <ProtectedRoute user={user} isAllowed={user != null}>
                    <Dashboard view="history" />
                </ProtectedRoute>
            } />
            <Route path="lesson" element={<Lessons />}>
                <Route path=":lessonSlug/quiz" element={
                    <ProtectedRoute user={user} isAllowed={user != null} redirectPath="/categories">
                        <LessonQuiz />
                    </ProtectedRoute>} />
            </Route>

            <Route path="users/" element={<Users />} />
            <Route path="users/:id/edit" element={
                <ProtectedRoute user={user} isAllowed={user != null}>
                    <EditProfile />
                </ProtectedRoute>
            } />
            <Route path="users/:id/activity" element={<Profile view="activity" />} />
            <Route path="users/:id/history" element={<Profile view="history" />} />

            <Route path="categories" element={<Categories />} />
            <Route path="categories/add" element={
                <ProtectedRoute user={user} isAllowed={user != null && user.is_admin} redirectPath="/categories">
                    <CategoryAdd />
                </ProtectedRoute>
            } />
            <Route path="categories/edit" element={
                <ProtectedRoute user={user} isAllowed={user != null && user.is_admin} redirectPath="/categories">
                    <CategoryEdit />
                </ProtectedRoute>
            } />
            <Route path="categories/edit/:lessonSlug" element={
                <ProtectedRoute user={user} isAllowed={user != null && user.is_admin} redirectPath="/categories">
                    <LessonEdit />
                </ProtectedRoute>
            } />
            <Route path="categories/edit/:lessonSlug/words" element={
                <ProtectedRoute user={user} isAllowed={user != null && user.is_admin} redirectPath="/categories">
                    <WordsEdit />
                </ProtectedRoute>
            } />
            <Route path="categories/edit/:lessonSlug/words/add" element={
                <ProtectedRoute user={user} isAllowed={user != null && user.is_admin} redirectPath="/categories">
                    <WordAdd />
                </ProtectedRoute>
            } />
            <Route path="categories/edit/:lessonSlug/words/:wordId" element={
                <ProtectedRoute user={user} isAllowed={user != null && user.is_admin} redirectPath="/categories">
                    <WordEdit />
                </ProtectedRoute>
            } />

            <Route path="sign-up" element={
                <ProtectedRoute user={user} isAllowed={user == null} redirectPath="/dashboard/activity">
                    <SignUp />
                </ProtectedRoute>
            } />
            <Route path="login" element={
                <ProtectedRoute user={user} isAllowed={user == null} redirectPath="/dashboard/activity">
                    <Login />
                </ProtectedRoute>
            } />
            <Route path="*" element={<NoView />} />
        </Routes>
    )
}

export default AppRoutes
