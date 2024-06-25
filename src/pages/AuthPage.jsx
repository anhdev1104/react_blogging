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
`;

const AuthPage = ({ children }) => {
  return (
    <AuthPageStyles>
      <div className="container-page">
        <img srcSet="/logo.png 2x" alt="Logo Monkey Blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthPageStyles>
  );
};

export default AuthPage;
