import React from "react";
import PageWrapper from "components/PageWrapper";
import CharacterPreview from "components/CharacterPreview";
import { MyCharacters } from "appConstants";
import "./index.css";
import Link from "components/Link";

const Characters: React.FC = () => {
    const characterPreviews = Object.keys(MyCharacters).map((galleryId) => {
        return <CharacterPreview id={galleryId} />;
    });
    return (
        <PageWrapper color="#ebfffe" title="Characters" alignItems="center">
            <div className="characters-wrapper">{characterPreviews}</div>
            <p>
                Icons by{" "}
                <Link href="https://bsky.app/profile/kiyonescarlet.bsky.social">
                    KiyoneScarlet
                </Link>
            </p>
        </PageWrapper>
    );
};

export default Characters;
