import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  :root {
    --gray1: #f3f3f3;

    --board-bg: #b3d2ee;
    --border: #bbb;
    --card-bg: #ccc;
    --border-radius: 3px;
    --title-bg: var(--gray1);
    --bg-hover: #ddd;

    --p1: 0.25rem;
    --p2: 0.5rem;
    --p3: 0.75rem;
    --p4: 1rem;
    --p5: 1.25rem;
    --p6: 1.5rem;
    --p7: 1.75rem;
    --p8: 2rem;

    --font-size1: 8px;
    --font-size2: 12px;
    --font-size3: 16px;
    --font-size4: 20px;
    --font-size5: 24px;
    --font-size6: 32px;

    --col-width: 280px;
  }
`

export const theme = {
  colors: {
    primary: '#0070f3',
  },
}
