import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  display: block;
  a {
    display: block;
  }
  ${props =>
    props.size === 'nomarl' &&
    css`
      font-size: 18px;
    `};
  ${props =>
    props.size === 'big' &&
    css`
      font-size: 22px;
    `};
`;

const PostTitle = ({ className, children = '', size = 'normal', to = '/' }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
