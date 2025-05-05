import React from "react";
import PageWrapper from "components/PageWrapper";
import { useNavigate, useParams } from "react-router";
import { Characters } from "appConstants";
import NotFound from "pages/NotFound";
import Button from "components/Button";

type CharacterParams = {
    character: string;
};

const CharacterRef: React.FC = () => {
    const params = useParams<CharacterParams>();
    const navigate = useNavigate();

    const characterInfo = params.character && Characters[params.character];
    if (!characterInfo) {
        // If this characters isn't found, show 404
        return <NotFound />;
    }

    return (
        <PageWrapper
            color={characterInfo.color}
            title={characterInfo.name}
            alignItems="center"
        >
            <characterInfo.RefContents />
            <Button onClick={() => navigate(`./..`)}>
                Back to Character Page
            </Button>
        </PageWrapper>
    );
};

export default CharacterRef;
