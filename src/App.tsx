import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const App: React.FC = () => {
    return (
        <div className="site">
            <RouterProvider router={router} />
            <div className="bg">
                <ColorfulHex />
            </div>
        </div>
    );
};

export default App;
