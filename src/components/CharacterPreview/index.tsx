import React from "react";
import { MyCharacterID, CharacterInfo, MyCharacters } from "appConstants";
import PagePreviewSection from "components/PagePreviewSection";
import { ReactComponent as Paw } from "images/paw.svg";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";

type CharacterPreviewProps = {
    id: MyCharacterID;
};

const CharacterPreview: React.FC<CharacterPreviewProps> = ({ id }) => {
    const [imageSource, setImageSource] = React.useState();
    const [ref, loaded, onLoad] = useImageLoaded();
    const [characterInfo, setCharacterInfo] = React.useState<CharacterInfo>();

    React.useEffect(() => {
        setCharacterInfo(MyCharacters[id]);
        try {
            const characterImg = require(`images/characters/${id}.png`);
            setImageSource(characterImg);
        } catch (e) {
            onLoad();
        }
    }, [id, onLoad]);

    if (!characterInfo) {
        return <></>;
    }

    const thumbnail = imageSource ? (
        <img
            className="character-thumbnail"
            src={imageSource}
            alt={`An icon for the character ${characterInfo.name}`}
            ref={ref}
            onLoad={onLoad}
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
                <div className="character-thumbnail-wrapper">
                    {!loaded && <LoadingBox />}
                    {thumbnail}
                </div>
            </PagePreviewSection>
        </div>
    );
};

export default CharacterPreview;
