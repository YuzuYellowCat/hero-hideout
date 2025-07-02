import React from "react";
import { CharacterContext } from "contexts/CharacterContext";

type CharacterHasNoRefProps = {
    characterId: string;
};

const CharacterHasNoRef: React.FC<CharacterHasNoRefProps> = ({
    characterId,
}) => {
    const characters = React.useContext(CharacterContext);
    const characterName = characters.get(characterId)?.name;

    return <p>{characterName ?? "This character"} does not have a ref.</p>;
};

export default CharacterHasNoRef;
