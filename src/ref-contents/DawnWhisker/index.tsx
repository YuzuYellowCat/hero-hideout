import RefContentsWrapper from "components/RefContentsWrapper";
import React from "react";

const DawnWhiskerRefContents: React.FC = () => {
    return (
        <RefContentsWrapper>
            <h3>Main Ref</h3>
            <img
                src={require(`images/refs/dawnwhisker/main-ref.jpeg`)}
                alt="The main reference page for the hero DawnWhisker"
            />
            <p>
                Ref drawn by{" "}
                <a
                    href="https://bsky.app/profile/imdanuki.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @imdanuki.bsky.social
                </a>
            </p>
        </RefContentsWrapper>
    );
};

export default DawnWhiskerRefContents;
