import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  overflow-y: scroll;
  border-radius: var(--border-radius-md);
  width: ${(props) => props.$width || "100%"};
  max-height: ${(props) => props.$height || "auto"};
  box-shadow: var(--shadow-md);
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 4rem;
  padding: 1.8rem 4rem;
  align-items: center;
  background-color: var(--color-white);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-200);
  }
`;

const StyledHeader = styled(CommonRow)`
  display: grid;
  column-gap: 4rem;
  align-items: center;
  position: sticky;
  top: 0;

  background-color: var(--color-primary-900);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 500;
  color: var(--color-white);
  font-size: 1.6rem;
`;

const StyledRow = styled(CommonRow)`
  padding: 2rem 4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-200);
  }
`;

const StyledBody = styled.section`
  margin: 0;
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding-top: 1rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const TableContext = createContext();

function Table({ columns = "1fr", width = "100%", height = "auto", children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table" $width={width} $height={height}>
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns}>
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}
function Body({ children }) {
  return <StyledBody>{children}</StyledBody>;
}

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
