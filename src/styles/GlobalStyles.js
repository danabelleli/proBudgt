import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
    --color-primary-300: #e9f5db;
  --color-primary-400: #cfe1b9;
  --color-primary-500: #b5c99a;
  --color-primary-600: #97a97c;
  --color-primary-700: #87986a;
  --color-primary-800: #718355;
  --color-primary-900: #505d3c;

  --color-secondary-300: #f8f3ec;
  --color-secondary-400: #e1d2b9;
  --color-secondary-500: #c9b79a;
  --color-secondary-600: #a9987c;
  --color-secondary-700: #98866a;
  --color-secondary-800: #837155;

  --color-gray-400: #cdcfcb;
  --color-gray-300: #e8e9e7;
  --color-gray-500: #b2b5ae;
  --color-gray-600: #94988d;
  --color-gray-700: #83877b;
  --color-gray-800: #6d7167;
  --color-gray-900: #272824;

  --color-white: #fff;
  
}

*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Lexend', sans-serif;
    font-weight: 300;
    font-size: 1.6rem;
  }

`;

export default GlobalStyles;
