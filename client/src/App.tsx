import Navigation from "./components/Navigation";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/styles/global-styles";
import { theme } from "./assets/styles/theme";

import Hire from "./pages/Hire"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigation />
    </ThemeProvider>
  );
  return (
    <div className="App">
      <Hire />
    </div>
  );
}

export default App;
