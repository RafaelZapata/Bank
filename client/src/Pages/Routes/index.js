export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/auth" element={<Pages.Login />} />
                <Route path="/client" element={<Pages.Client />} />
                <Route path="/" element={<Pages.Home />} />
            </Switch>
        </BrowserRouter>
    );
}
