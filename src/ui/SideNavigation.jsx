import {
  ArrowLeftStartOnRectangleIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const navigationLinks = [
  {
    name: "dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="size-10" />,
  },
  {
    name: "income",
    href: "/income",
    icon: <BanknotesIcon className="size-10" />,
  },
  {
    name: "expenses & budget",
    href: "/expenses-budget",
    icon: <ClipboardDocumentListIcon className="size-10" />,
  },
  {
    name: "savings",
    href: "/savings",
    icon: <CircleStackIcon className="size-10" />,
  },
  {
    name: "settings",
    href: "/settings",
    icon: <Cog6ToothIcon className="size-10" />,
  },
];

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 2rem 2rem;
`;

const Logo = styled.h2`
  font-weight: 800;
  font-size: 3.5rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const H3 = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-gray-900);
`;

const P = styled.p`
  font-size: 1.5rem;
  color: var(--color-gray-500);
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    gap: 2rem;
    padding: 0.7rem 1rem;
    text-transform: capitalize;
    font-size: 1.8rem;
    border-radius: 1.5rem;
  }

  &:hover {
    background-color: var(--color-primary-700);
  }

  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-primary-900);
    color: var(--color-white);
  }
`;

function SideNavigation() {
  return (
    <NavContainer>
      <Logo>proBudgt</Logo>
      <UserDetails>
        <div className="h-36 w-36 bg-[--color-gray-300] rounded-full"></div>
        <div className="flex flex-col items-center">
          <H3>username</H3>
          <P>username@gmail.com</P>
        </div>
      </UserDetails>
      <StyledUl>
        {navigationLinks.map((navLink) => (
          <StyledNavLink to={navLink.href} key={navLink.name}>
            {navLink.icon}
            {navLink.name}
          </StyledNavLink>
        ))}
      </StyledUl>

      <Button
        option="secondary"
        size="medium"
        className="mt-auto flex gap-4 items-center w-full"
      >
        <ArrowLeftStartOnRectangleIcon className="size-10" />
        log out
      </Button>
    </NavContainer>
  );
}

export default SideNavigation;
