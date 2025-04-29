import styled from "styled-components";

const Form = styled.form`
  padding: 5rem 20rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5rem;

  @media (max-width: 1440px) {
    padding: 5rem 10rem;
  }
`;

export default Form;
