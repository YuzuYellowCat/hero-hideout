import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Galleries from "pages/Galleries";
import GalleryPage from "pages/GalleryPage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="site">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/galleries" element={<Galleries />} />
                    <Route
                        path="/galleries/:gallery"
                        element={<GalleryPage />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <div className="bg">
                    <ColorfulHex />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
