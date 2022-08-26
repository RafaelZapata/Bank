import useTheme from "utilities/theme";
import { ThemeProvider } from "styled-components";
import * as Pages from "pages";
import GlobalStyles from "assets/styles";
import { ContextProvider } from "context";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Permissions from "components/Permissions";

export default function Routes() {
  const theme = useTheme();

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" element={ <Permissions page={ Pages.Login } isPublic /> } />
            <Route path="/settings" element={ <Permissions page={ Pages.Settings } /> } />
            <Route path="/" element={ <Permissions page={ Pages.Home } /> } />
          </Switch>
        </BrowserRouter>
        <GlobalStyles />
      </ThemeProvider>
    </ContextProvider>
  );
}
