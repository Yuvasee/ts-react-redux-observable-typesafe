import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        font-family: 'Mulish', sans-serif;
    }

    ul[class],
    ol[class] {
        padding: 0;
        list-style: none;
    }

    body,
    h1,
    h2,
    h3,
    h4,
    p,
    ul[class],
    ol[class],
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
        margin: 0;
    }

    a:not([class]) {
        text-decoration-skip-ink: auto;
    }

    img {
        max-width: 100%;
        display: block;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }
`;

GlobalStyle.displayName = 'GlobalStyle';

export default GlobalStyle;
