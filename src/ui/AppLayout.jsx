import styled from "styled-components";
import SideNavigation from "./SideNavigation";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  column-gap: 5rem;
  height: 100vh;
  padding: 5rem;
  background-color: var(--color-secondary-300);
`;

const Main = styled.main`
  overflow-y: scroll;
`;

function AppLayout() {
  return (
    <Container>
      <SideNavigation />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default AppLayout;
