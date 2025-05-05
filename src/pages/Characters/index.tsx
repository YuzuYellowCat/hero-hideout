import React from "react";
import PageWrapper from "components/PageWrapper";
import CharacterPreview from "components/CharacterPreview";
import { Characters as CharacterContent } from "appConstants";

const Characters: React.FC = () => {
    const characterPreviews = Object.keys(CharacterContent).map((galleryId) => {
        return <CharacterPreview id={galleryId} />;
    });
    return (
        <PageWrapper color="#ebfffe" title="Characters">
            {characterPreviews}
        </PageWrapper>
    );
};

export default Characters;
