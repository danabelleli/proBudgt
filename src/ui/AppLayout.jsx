import styled from "styled-components";
import SideNavigation from "./SideNavigation";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 40rem 1fr;
  height: 100vh;

  @media (max-width: 1440px) {
    grid-template-columns: 32rem 1fr;
  }
`;

const Main = styled.main`
  overflow-y: scroll;
  padding: 5rem 10rem;
  background-color: var(--color-secondary-300);

  @media (max-width: 1440px) {
    padding: 5rem 5rem;
  }
`;

const Container = styled.div`
  max-width: 140rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (max-width: 1440px) {
    max-width: 120rem;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideNavigation />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
