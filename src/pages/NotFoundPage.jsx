import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: #fff;
    background-color: ${props => props.theme.primary};
    border-radius: 6px;
    font-weight: 500;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyle>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="logo-monkey-blogging" />
      </NavLink>
      <h1 className="heading">Oops! Page not found</h1>
      <NavLink to="/" className="back">
        Back to home
      </NavLink>
    </NotFoundPageStyle>
  );
};

export default NotFoundPage;
