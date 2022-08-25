import useTheme from "utilities/theme";
import { ThemeProvider } from "styled-components";
import * as Pages from "pages";
import GlobalStyles from "assets/styles";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

export default function Routes() {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" element={<Pages.Login />} />
                    <Route path="/settings" element={<Pages.Settings />} />
                    <Route path="/" element={<Pages.Home />} />
                </Switch>
            </BrowserRouter>
            <GlobalStyles />
        </ThemeProvider>
    );
}
