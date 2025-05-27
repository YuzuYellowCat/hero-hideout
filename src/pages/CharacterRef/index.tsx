import React from "react";
import PageWrapper from "components/PageWrapper";
import { useNavigate, useParams } from "react-router";
import NotFound from "pages/NotFound";
import Button from "components/Button";
import { CharacterContext } from "contexts/CharacterContext";

type CharacterParams = {
    character: string;
};

const CharacterRef: React.FC = () => {
    const params = useParams<CharacterParams>();
    const navigate = useNavigate();
    const characters = React.useContext(CharacterContext);
    const [refComponent, setRefComponent] =
        React.useState<React.ReactElement>();

    React.useEffect(() => {
        if (!params.character) {
            return;
        }
        import(`ref-contents/${params.character}`)
            .then((module) => {
                const Component = module.default;
                setRefComponent(<Component />);
            })
            .catch(() => {});
    }, [params]);

    const character = params.character && characters.get(params.character);
    if (!character || !refComponent) {
        // If this characters isn't found, or it doesn't have a ref, show 404
        return <NotFound />;
    }

    return (
        <PageWrapper
            color={character.color}
            title={character.name}
            alignItems="center"
        >
            {refComponent}
            <Button onClick={() => navigate(`./..`)}>
                Back to Character Page
            </Button>
        </PageWrapper>
    );
};

export default CharacterRef;
