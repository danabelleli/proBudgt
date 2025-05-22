import { NavLink, Outlet } from "react-router-dom";
import Overview from "../ui/Overview";
import Row from "../ui/Row";
import Title from "../ui/Title";
import styled from "styled-components";

const Ul = styled.ul`
  width: 100%;
  display: flex;
  gap: 1.2rem;
`;

const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    font-weight: 500;
    text-transform: capitalize;
    padding: 0.8rem 1.5rem;
    border-radius: var(--border-radius-sm);
  }

  &:hover {
    background-color: var(--color-primary-600);
  }

  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-primary-900);
    color: var(--color-white);
  }
`;

const navTabs = [
  { tab: "user", linkTo: "user" },
  { tab: "categories", linkTo: "categories" },
];

function Settings() {
  return (
    <>
      <Row>
        <Title as="h1">settings</Title>
      </Row>
      <Row>
        <Ul>
          {navTabs.map((tab) => (
            <StyledLink to={tab.linkTo} key={tab.tab}>
              {tab.tab}
            </StyledLink>
          ))}
        </Ul>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </>
  );
}

export default Settings;
