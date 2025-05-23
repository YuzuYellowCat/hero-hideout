import React from "react";
import PageWrapper from "components/PageWrapper";
import { useNavigate, useParams } from "react-router";
import { MyCharacters } from "appConstants";
import NotFound from "pages/NotFound";
import Button from "components/Button";

type CharacterParams = {
    character: string;
};

const CharacterPage: React.FC = () => {
    const params = useParams<CharacterParams>();
    const navigate = useNavigate();

    const characterInfo = params.character && MyCharacters[params.character];
    if (!characterInfo) {
        // If this gallery isn't found, show the 404 page
        return <NotFound />;
    }

    return (
        <PageWrapper
            color={characterInfo.color}
            title={characterInfo.name}
            alignItems="center"
        >
            <p>
                {
                    "//TODO -- Fill with gallery of art & comms featuring this character"
                }
            </p>
            <Button onClick={() => navigate("ref")}>View Ref</Button>
        </PageWrapper>
    );
};

export default CharacterPage;
