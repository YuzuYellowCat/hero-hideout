import React from "react";
import RefContentsWrapper from "components/RefContentsWrapper";

const MercurialRefContents: React.FC = () => {
    return (
        <RefContentsWrapper>
            <h3>Main Ref</h3>
            <img
                src={require(`images/refs/mercurial/first-draw.jpeg`)}
                alt="A drawing of the villain Mercurial!"
            />
        </RefContentsWrapper>
    );
};

export default MercurialRefContents;
