import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home/Home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact strict>
                <Home />
            </Route>
        </BrowserRouter>
    )
}

export default Routes