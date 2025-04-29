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

  --color-gray-200: #F2F3F2;
  --color-gray-300: #E8E9E7;
  --color-gray-400: #CDCECC;
  --color-gray-500: #B2B3B0;
  --color-gray-600: #939590;
  --color-gray-700: #81847E;
  --color-gray-800: #6C6E6A;
  --color-gray-900: #262725;

  --color-white: #fff;
  --color-black: #000;
  --color-red-dark: #8F1414;
  --color-red-light: #B31919;

  --shadow-sm: 0 2px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-sm: 1.5rem;
  --border-radius-md: 2rem;

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
    //min-height: 100vh;
  }

`;

export default GlobalStyles;
