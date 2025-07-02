import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Characters from "pages/Characters";
import CharacterPage from "pages/CharacterPage";
import CharacterRef from "pages/CharacterRef";
import ContentManager from "pages/ContentManager";
import Testing from "pages/Testing";
import Credit from "pages/Credit";
import { CharacterProvider } from "contexts/CharacterContext";
import Gallery from "pages/Gallery";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="site">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/gallery" element={<Gallery />} />
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
                    <Route path="/credits/:credit" element={<Credit />} />

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
