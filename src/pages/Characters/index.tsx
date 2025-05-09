import React from "react";
import PageWrapper from "components/PageWrapper";
import CharacterPreview from "components/CharacterPreview";
import { Characters as CharacterContent } from "appConstants";
import "./index.css";

const Characters: React.FC = () => {
    const characterPreviews = Object.keys(CharacterContent).map((galleryId) => {
        return <CharacterPreview id={galleryId} />;
    });
    return (
        <PageWrapper color="#ebfffe" title="Characters">
            <div className="characters-wrapper">{characterPreviews}</div>
        </PageWrapper>
    );
};

export default Characters;
