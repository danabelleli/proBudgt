import styled from "styled-components";

const GridRow = styled.div`
  display: grid;
  // grid-template-columns: 14rem 1fr;
  grid-template-columns: ${(props) => props.$columns || "14rem 1fr"};
  column-gap: 2rem;

  row-gap: 2rem; // optional for better spacing when stacking

  @media (max-width: 1440px) {
    grid-template-columns: ${(props) =>
      props.$columnsMobile || props.$columns || "14rem 1fr"};
    column-gap: 4rem;
    row-gap: 4rem;
  }
`;

export default GridRow;
