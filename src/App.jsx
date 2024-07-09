import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PostDetailsPage from './pages/PostDetailsPage';
import DashboardLayout from './modules/dashboard/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import PostManage from './modules/posts/PostManage';
import PostAddNew from './modules/posts/PostAddNew';
import CategoryAddNew from './modules/category/CategoryAddNew';
import CategoryManage from './modules/category/CategoryManage';
import CategoryUpdate from './modules/category/CategoryUpdate';

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
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
