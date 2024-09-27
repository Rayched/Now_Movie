//App Components

import { ThemeProvider } from "styled-components";
import Router from "./router";
import { DarkTheme, LightTheme } from "./modules/Themes";
import { useState } from "react";

function App(){
  const [isDark, setDark] = useState(false);

  return (
    <div>
      <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
        <Router />
      </ThemeProvider>
    </div>
  );
};

export default App;