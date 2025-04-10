import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import { createBrowserRouter, RouterProvider } from "react-router";
import Test from "pages/Test";
import About from "pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Test />,
    },
    {
        path: "/about",
        element: <About />,
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
