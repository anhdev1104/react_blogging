import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
