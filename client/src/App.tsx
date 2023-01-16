import Navigation from "./components/Navigation";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/styles/global-styles";
import { theme } from "./assets/styles/theme";
import Hire from "./pages/Hire";
import Hunting from "./pages/Hunting";
import EditHire from "./pages/EditHire";
import EditHunting from "./pages/EditHunting";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        <Routes>
          <Route path="/hire" element={<Hire />} />
          <Route path="/hunting" element={<Hunting />} />
          <Route path="/edithire" element={<EditHire />} />
          <Route path="/edithunting" element={<EditHunting />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
