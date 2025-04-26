import styled from "styled-components";

const StyledLogo = styled.span`
  color: var(--color-gray-900);
  font-weight: 800;
  font-size: 3rem;
`;

function Logo() {
  return <StyledLogo>proBudgt</StyledLogo>;
}

export default Logo;
