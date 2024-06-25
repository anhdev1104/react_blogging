import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
