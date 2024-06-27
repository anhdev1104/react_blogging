import styled, { css } from 'styled-components';
import LoadingSpinner from '../loading/LoadingSpinner';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: #fff;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  height: ${props => props.height || '66px'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s linear;
  ${props =>
    props.kind === 'secondary' &&
    css`
      color: ${props => props.theme.primary};
      background-color: white;
    `};
  ${props =>
    props.kind === 'primary' &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${props => props.theme.primary},
        ${props => props.theme.secondary}
      );
    `};
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({ type = 'button', onClick = () => {}, children, kind = 'primary', ...props }) => {
  const { isLoading, to } = props;
  const child = isLoading ? <LoadingSpinner /> : children;
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink
        to={to}
        style={{
          display: 'inline-block',
        }}
      >
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;
