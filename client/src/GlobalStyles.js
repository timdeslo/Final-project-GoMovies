import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
      
    }
    html, body {
        margin: 0;
        background-color:black;
        
        
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1 {
      color: white;
      font-family: 'Oswald', sans-serif;
    }
    h2 {
      font-size: 28px;
    }
    p {
      color: white;
      font-family: 'Oswald', sans-serif;
    }
`;
