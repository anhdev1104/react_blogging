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

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path="/:slug" element={<PostDetailsPage />}></Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/manage/post" element={<PostManage />}></Route>
            <Route path="/manage/add-post" element={<PostAddNew />}></Route>
            <Route path="/manage/category" element={<CategoryManage />}></Route>
            <Route path="/manage/add-category" element={<CategoryAddNew />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
