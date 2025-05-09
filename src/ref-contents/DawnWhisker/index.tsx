import RefContentsWrapper from "components/RefContentsWrapper";
import React from "react";
import Link from "components/Link";

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
                <Link href="https://bsky.app/profile/imdanuki.bsky.social">
                    imdanuki
                </Link>
            </p>
        </RefContentsWrapper>
    );
};

export default DawnWhiskerRefContents;
