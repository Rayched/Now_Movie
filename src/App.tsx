//App Components

import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { DarkTheme, LightTheme } from "./modules/Themes";
import { isDark } from "./atoms";
import { useRecoilValue } from "recoil";
import {ReactQueryDevtools} from "react-query/devtools";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
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
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    display: block;
  }
`;

function App(){
  const Themes = useRecoilValue(isDark);

  return (
    <div>
      <ThemeProvider theme={Themes ? DarkTheme : LightTheme}>
          <Router />
          <GlobalStyle />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left"/>
      </ThemeProvider>
    </div>
  );
};

export default App;