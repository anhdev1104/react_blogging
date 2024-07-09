import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import CategoryAddNew from './modules/category/CategoryAddNew';
import CategoryManage from './modules/category/CategoryManage';
import CategoryUpdate from './modules/category/CategoryUpdate';
import DashboardLayout from './modules/dashboard/DashboardLayout';
import PostAddNew from './modules/posts/PostAddNew';
import PostManage from './modules/posts/PostManage';
import UserAddNew from './modules/user/UserAddNew';
import UserManage from './modules/user/UserManage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PostDetailsPage from './pages/PostDetailsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />

          <Route path="*" element={<NotFoundPage />} />
          <Route path="/:slug" element={<PostDetailsPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/manage/post" element={<PostManage />} />
            <Route path="/manage/add-post" element={<PostAddNew />} />
            <Route path="/manage/category" element={<CategoryManage />} />
            <Route path="/manage/add-category" element={<CategoryAddNew />} />
            <Route path="/manage/update-category" element={<CategoryUpdate />} />
            <Route path="/manage/user" element={<UserManage />} />
            <Route path="/manage/add-user" element={<UserAddNew />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
