import React from "react";
import { CharacterID, Characters } from "appConstants";
import PagePreviewSection from "components/PagePreviewSection";

type CharacterPreviewProps = {
    id: CharacterID;
};

const CharacterPreview: React.FC<CharacterPreviewProps> = ({ id }) => {
    const characterInfo = Characters[id];
    return (
        <PagePreviewSection
            title={characterInfo.name}
            navigationPath={`/characters/${id}`}
            color={characterInfo.color}
        >
            {"// TODO -- Put character image here"}
        </PagePreviewSection>
    );
};

export default CharacterPreview;
