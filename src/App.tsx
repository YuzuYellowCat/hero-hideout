import "./App.css";
import ColorfulHex from "./components/ColorfulHex";

function App() {
    return (
        <div className="site">
            <div className="contents">
                <div className="section">
                    <h1>YuzuCat</h1>
                    <h3>beats up TurboWolf</h3>
                </div>
            </div>
            <div className="bg">
                <ColorfulHex />
            </div>
        </div>
    );
}

export default App;
