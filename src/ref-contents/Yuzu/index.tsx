import RefContentsWrapper from "components/RefContentsWrapper";
import React from "react";
import Link from "components/Link";

const YuzuRefContents: React.FC = () => {
    return (
        <RefContentsWrapper>
            <h3>Main Ref</h3>
            <img
                src={require(`images/refs/yuzu/main-ref.png`)}
                alt="The main reference page for Yuzu"
            />
            <p>
                Ref drawn by{" "}
                <Link href="https://bsky.app/profile/jungabeast.bsky.social">
                    JungaBeast
                </Link>
            </p>
        </RefContentsWrapper>
    );
};

export default YuzuRefContents;
