import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15rem 1fr;
  gap: 5rem;

  padding: 1.3rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-200);
  }

  @media (max-width: 1440px) {
    grid-template-columns: 10rem 1fr;
  }
`;

const Label = styled.label`
  color: var(--color-gray-900);
  text-transform: capitalize;
  font-size: 1.6rem;
  font-weight: 500;
`;

const Error = styled.span`
  color: var(--color-red-dark);
  font-size: 1.4rem;
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      <div className="flex flex-col items-end gap-4">
        {children}
        {error && <Error>{error}</Error>}
      </div>
    </StyledFormRow>
  );
}

export default FormRow;
