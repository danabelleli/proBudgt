import {
  HomeIcon as HomeIconOutline,
  BanknotesIcon as BanknotesIconOutline,
  ClipboardDocumentListIcon as ClipboardIconOutline,
  CircleStackIcon as CircleStackIconOutline,
  Cog6ToothIcon as CogIconOutline,
  ArrowLeftStartOnRectangleIcon,
  CalculatorIcon as CalculatorIconOutline,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeIconSolid,
  BanknotesIcon as BanknotesIconSolid,
  ClipboardDocumentListIcon as ClipboardIconSolid,
  CircleStackIcon as CircleStackIconSolid,
  Cog6ToothIcon as CogIconSolid,
  CalculatorIcon as CalculatorIconSolid,
} from "@heroicons/react/24/solid";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Title from "./Title";

const navigationLinks = [
  {
    name: "dashboard",
    href: "/dashboard",
    icon: {
      outline: <HomeIconOutline className="size-10" />,
      solid: <HomeIconSolid className="size-10" />,
    },
  },
  {
    name: "income",
    href: "/income",
    icon: {
      outline: <BanknotesIconOutline className="size-10" />,
      solid: <BanknotesIconSolid className="size-10" />,
    },
  },
  {
    name: "expenses",
    href: "/expenses",
    icon: {
      outline: <ClipboardIconOutline className="size-10" />,
      solid: <ClipboardIconSolid className="size-10" />,
    },
  },
  {
    name: "budget",
    href: "/budget",
    icon: {
      outline: <CalculatorIconOutline className="size-10" />,
      solid: <CalculatorIconSolid className="size-10" />,
    },
  },
  {
    name: "savings",
    href: "/savings",
    icon: {
      outline: <CircleStackIconOutline className="size-10" />,
      solid: <CircleStackIconSolid className="size-10" />,
    },
  },
  {
    name: "settings",
    href: "/settings",
    icon: {
      outline: <CogIconOutline className="size-10" />,
      solid: <CogIconSolid className="size-10" />,
    },
  },
];

const NavContainer = styled.aside`
  background-color: var(--color-secondary-300);
  padding: 5rem 5rem;

  @media (max-width: 1440px) {
    padding: 2rem 2rem;
  }
`;

const NavContent = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 2rem 2rem;
  background-color: var(--color-white);

  @media (max-width: 1440px) {
    gap: 4rem;
  }
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

const Avatar = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: var(--color-gray-300);

  @media (max-width: 1440px) {
    width: 6rem;
    height: 6rem;
  }
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
    transition: all 0.2s ease;
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

function SideNavigation() {
  return (
    <NavContainer>
      <NavContent>
        <Logo>proBudgt</Logo>
        <UserDetails>
          <Avatar />
          <div className="flex flex-col items-center">
            <Title as="h3">username</Title>
            <P>username@gmail.com</P>
          </div>
        </UserDetails>
        <StyledUl>
          {navigationLinks.map(({ name, href, icon }) => (
            <StyledNavLink
              to={href}
              key={name}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {({ isActive }) => (
                <>
                  {isActive ? icon.solid : icon.outline}
                  {name}
                </>
              )}
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
      </NavContent>
    </NavContainer>
  );
}

export default SideNavigation;
