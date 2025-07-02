import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "components/PageWrapper";
import { useNavigate, useParams } from "react-router";
import NotFound from "pages/NotFound";
import Button from "components/Button";
import { CharacterContext } from "contexts/CharacterContext";

type CharacterParams = {
    character: string;
};

const CharacterPage: React.FC = () => {
    const params = useParams<CharacterParams>();
    const characters = useContext(CharacterContext);
    const navigate = useNavigate();
    const [hasRef, setHasRef] = useState<boolean | null>(null);

    const character = React.useMemo(
        () => params.character && characters.get(params.character),
        [params.character, characters]
    );

    useEffect(() => {
        if (hasRef !== null) {
            return;
        }

        if (!character) {
            return;
        }

        try {
            require(`../../ref-contents/${character.name}`);
            setHasRef(true);
        } catch {
            setHasRef(false);
        }
    }, [character, hasRef]);

    if (!character || character.isGuest) {
        // If this character isn't found, show the 404 page
        return <NotFound />;
    }

    return (
        <PageWrapper
            color={character.color}
            title={character.name}
            alignItems="center"
        >
            <p>
                {
                    "//TODO -- Fill with gallery of art & comms featuring this character"
                }
            </p>
            {hasRef && (
                <Button onClick={() => navigate("ref")}>View Ref</Button>
            )}
        </PageWrapper>
    );
};

export default CharacterPage;
