import React from "react";
import PagePreviewSection from "components/PagePreviewSection";
import { ReactComponent as Paw } from "images/paw.svg";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";

type CharacterPreviewProps = {
    character: Character;
};

const CharacterPreview: React.FC<CharacterPreviewProps> = ({ character }) => {
    const [ref, loaded, onLoad] = useImageLoaded();

    const thumbnail = character.image ? (
        <img
            className="character-thumbnail"
            src={`${process.env.REACT_APP_ENDPOINT}/api/images/${character.image}`}
            alt={`An icon for the character ${character.name} made by KiyoneScarlet`}
            ref={ref}
            onLoad={onLoad}
        />
    ) : (
        <div className="character-thumbnail">
            <Paw stroke={character.color} strokeWidth={4} />
        </div>
    );
    return (
        <div className="character-preview">
            <PagePreviewSection
                title={character.name}
                navigationPath={`/characters/${character.characterId}`}
                color={character.color}
                hasFlourish={false}
                fullHover
            >
                <div className="character-thumbnail-wrapper">
                    {!loaded && <LoadingBox />}
                    {thumbnail}
                </div>
            </PagePreviewSection>
        </div>
    );
};

export default CharacterPreview;
