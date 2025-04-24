import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1.5rem;
    padding: 0.7rem 1rem;
    font-weight: 500;
  `,
};

const options = {
  primary: css`
    background-color: var(--color-primary-900);
    color: var(--color-white);

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
    border: 2px solid var(--color-gray-900);

    &:focus {
      outline: 1px solid var(--color-gray-900);
    }

    &:hover {
      background-color: var(--color-gray-300);
    }
  `,
};

const Button = styled.button`
  border-radius: 1.5rem;
  text-transform: uppercase;
  cursor: pointer;

  ${(props) => sizes[props.size]}
  ${(props) => options[props.option]}
`;

Button.defaultProps = {
  size: "medium",
  option: "primary",
};

export default Button;
