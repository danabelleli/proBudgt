import styled, { css } from "styled-components";

const Title = styled.h1`
  text-transform: capitalize;
  color: var(--color-gray-900);

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.6rem;
      font-weight: 500;
    `}
`;

export default Title;
