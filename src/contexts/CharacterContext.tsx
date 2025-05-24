import React from "react";

let _characterCache: Map<String, Character> = new Map();

export const CharacterContext =
    React.createContext<Map<String, Character>>(_characterCache);

export const CharacterProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [characters, setCharacters] =
        React.useState<Map<String, Character>>(_characterCache);
    React.useEffect(() => {
        if (_characterCache.size > 0) {
            setCharacters(_characterCache);
            return;
        }
        fetch(`${process.env.REACT_APP_ENDPOINT}/api/characters`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((characters) => {
                const characterMap = new Map<String, Character>();
                for (const character of characters) {
                    characterMap.set(character.CharacterId, {
                        characterId: character.CharacterId,
                        name: character.Name,
                        color: character.Color,
                        image: character.ImageName,
                        isGuest: !!character.IsGuest,
                    });
                }
                _characterCache = characterMap;
                setCharacters(characterMap);
            });
    }, []);

    return (
        <CharacterContext.Provider value={characters}>
            {children}
        </CharacterContext.Provider>
    );
};
