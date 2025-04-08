import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import Header from "components/Header";

function App() {
    return (
        <div className="site">
            <div className="contents">
                <Header />
            </div>
            <div className="bg">
                <ColorfulHex />
            </div>
        </div>
    );
}

export default App;
