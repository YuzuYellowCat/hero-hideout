import React from "react";
import { CharacterID, CharacterInfo, Characters } from "appConstants";
import PagePreviewSection from "components/PagePreviewSection";
import { ReactComponent as Paw } from "images/paw.svg";
import "./index.css";

type CharacterPreviewProps = {
    id: CharacterID;
};

const CharacterPreview: React.FC<CharacterPreviewProps> = ({ id }) => {
    const [imageSource, setImageSource] = React.useState();
    const [characterInfo, setCharacterInfo] = React.useState<CharacterInfo>();

    React.useEffect(() => {
        setCharacterInfo(Characters[id]);
        try {
            const characterImg = require(`images/characters/${id}.png`);
            setImageSource(characterImg);
        } catch (e) {
            console.log(e);
        }
    }, [id]);

    if (!characterInfo) {
        return <></>;
    }

    const thumbnail = imageSource ? (
        <img
            className="character-thumbnail"
            src={imageSource}
            alt={`An icon for the character ${characterInfo.name}`}
        />
    ) : (
        <div className="character-thumbnail">
            <Paw stroke={characterInfo.color} strokeWidth={4} />
        </div>
    );
    return (
        <div className="character-preview">
            <PagePreviewSection
                title={characterInfo.name}
                navigationPath={`/characters/${id}`}
                color={characterInfo.color}
                hasFlourish={false}
                fullHover
            >
                {thumbnail}
            </PagePreviewSection>
        </div>
    );
};

export default CharacterPreview;
