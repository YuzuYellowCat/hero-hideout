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
            <h4>Info</h4>
            <ul>
                <li>
                    <b>Age</b>: 26
                </li>
                <li>
                    <b>Pronouns</b>: he/him
                </li>
                <li>
                    <b>Orientation</b>: Bisexual
                </li>
            </ul>
        </RefContentsWrapper>
    );
};

export default YuzuRefContents;
