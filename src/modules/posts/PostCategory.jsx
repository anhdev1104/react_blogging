import styled, { css } from 'styled-components';

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${props => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  background-color: #f3f3f3;
  ${props =>
    props.type === 'primary' &&
    css`
      background-color: ${props => props.theme.grayF3};
    `};
  ${props =>
    props.type === 'secondary' &&
    css`
      background-color: white;
    `};
`;

const PostCategory = ({ type = 'primary', className, children }) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      {children}
    </PostCategoryStyles>
  );
};

export default PostCategory;
