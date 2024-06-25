import styled from 'styled-components';
import LoadingSpinner from '../loading/LoadingSpinner';
import PropTypes from 'prop-types';

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: #fff;
  background: linear-gradient(to right bottom, ${props => props.theme.primary}, ${props => props.theme.secondary});
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  height: ${props => props.height || '66px'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s linear;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({ type = 'button', onClick = () => {}, children, ...props }) => {
  const { isLoading } = props;
  const child = isLoading ? <LoadingSpinner /> : children;

  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;