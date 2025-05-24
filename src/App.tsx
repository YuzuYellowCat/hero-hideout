import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Galleries from "pages/Galleries";
import GalleryPage from "pages/GalleryPage";
import Characters from "pages/Characters";
import CharacterPage from "pages/CharacterPage";
import CharacterRef from "pages/CharacterRef";
import ContentManager from "pages/ContentManager";
import Testing from "pages/Testing";
import { CharacterProvider } from "contexts/CharacterContext";

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
                    <Route
                        path="/characters"
                        element={
                            <CharacterProvider>
                                <Characters />
                            </CharacterProvider>
                        }
                    />
                    <Route
                        path="/characters/:character"
                        element={
                            <CharacterProvider>
                                <CharacterPage />
                            </CharacterProvider>
                        }
                    />
                    <Route
                        path="/characters/:character/ref"
                        element={
                            <CharacterProvider>
                                <CharacterRef />
                            </CharacterProvider>
                        }
                    />
                    <Route
                        path="/content-manager"
                        element={<ContentManager />}
                    />
                    <Route path="/testing" element={<Testing />} />

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
