import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const AuthPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .main-form {
    max-width: 600px;
    margin: 0 auto;
  }
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: 600;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${props => props.theme.primary};
      font-weight: 500;
      text-decoration: none;
    }
  }
`;

const AuthPage = ({ children }) => {
  return (
    <AuthPageStyles>
      <div className="container-page">
        <NavLink to="/">
          <img srcSet="/logo.png 2x" alt="Logo Monkey Blogging" className="logo" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthPageStyles>
  );
};

export default AuthPage;
