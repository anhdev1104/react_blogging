import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconSearch from '../icon/IconSearch';
import Button from '../button';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

const menuLinks = [
  {
    url: '/1',
    title: 'Home',
  },
  {
    url: '/2',
    title: 'Blog',
  },
  {
    url: '/3',
    title: 'Contact',
  },
];

const HeaderStyles = styled.header`
  padding: 40px;
  .header-main {
    display: flex;
    align-items: center;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }
  .header-right {
    margin-left: auto;
  }
  .search {
    position: relative;
    padding: 15px 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .search-input {
    flex: 1;
    padding-right: 30px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }
  .header-button {
    margin-left: 20px;
  }
  .header-auth {
    margin-left: 20px;
    strong {
      color: ${props => props.theme.primary};
    }
  }
`;

function getLastName(name) {
  if (!name) return '';
  const nameLength = name.split(' ').length;
  return name.split(' ')[nameLength - 1];
}

const Header = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <HeaderStyles>
      <div className="container-page">
        <div className="header-main">
          <Link to="/">
            <img srcSet="/logo.png 2x" alt="logo-monkey-blogging" className="logo" />
          </Link>
          <ul className="menu">
            {menuLinks.map((item, index) => (
              <li className="menu-item" key={index}>
                <Link to={item.url} className="menu-link">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="search">
            <input type="text" className="search-input" placeholder="Search posts..." />
            <IconSearch />
          </div>
          {!userInfo ? (
            <Button type="button" height="56px" className="header-button" to="/sign-in">
              Sign In
            </Button>
          ) : (
            <div className="header-auth">
              <span>Welcome back, </span>
              <strong style={{ fontWeight: '600' }}>{getLastName(userInfo?.displayName)}</strong>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
