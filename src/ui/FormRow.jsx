import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 8rem 1fr;
  gap: 2.5rem;

  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const Label = styled.label`
  color: var(--color-gray-900);
  text-transform: capitalize;
  font-size: 1.6rem;
  font-weight: 500;
`;

const Error = styled.span`
  color: red;
  font-size: 1.4rem;
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
