import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1.4rem;
    padding: 0.8rem 1.5rem;
    font-weight: 500;
  `,
  large: css`
    padding: 0.8rem 2.5rem;
    font-weight: 500;
    font-size: 1.5rem;
  `,
};

const options = {
  primary: css`
    background-color: var(--color-primary-900);
    color: var(--color-white);
    border: 1px solid var(--color-primary-900);

    &:focus {
      outline: 1px solid var(--color-primary-900);
    }

    &:hover {
      background-color: var(--color-primary-800);
    }
  `,

  secondary: css`
    color: var(--color-gray-900);
    background: var(--color-white);
    border: 1px solid var(--color-gray-900);

    &:focus {
      //outline: 2px solid var(--color-gray-900);
      border: 2px solid var(--color-gray-900);
    }

    &:hover {
      background-color: var(--color-gray-300);
    }
  `,

  danger: css`
    color: var(--color-white);
    background: var(--color-red-dark);
    border: 1px solid var(--color-red-dark);

    &:focus {
      outline: 1px solid var(--color-red-dark);
    }

    &:hover {
      background-color: var(--color-red-light);
    }
  `,
};

const Button = styled.button`
  border-radius: var(--border-radius-sm);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => sizes[props.size]}
  ${(props) => options[props.option]}
`;

Button.defaultProps = {
  size: "medium",
  option: "primary",
};

export default Button;
