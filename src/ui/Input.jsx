import styled from "styled-components";

const Input = styled.input`
  border: none;
  outline: none;
  background-color: var(--color-gray-200);
  border-radius: 1.5rem;
  padding: 1rem 1rem;
  height: 4rem;
  font-size: 1.6rem;

  transition: all 0.2s ease;

  &:focus,
  &:focus-visible {
    border: 1px solid var(--color-gray-900);
  }
`;

export default Input;
