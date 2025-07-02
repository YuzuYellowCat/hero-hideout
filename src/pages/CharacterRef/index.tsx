import React from "react";
import PageWrapper from "components/PageWrapper";
import { useNavigate, useParams } from "react-router";
import NotFound from "pages/NotFound";
import Button from "components/Button";
import { CharacterContext } from "contexts/CharacterContext";
import PageLoader from "components/PageLoader";
import CharacterHasNoRef from "components/CharacterHasNoRef";

type CharacterParams = {
    character: string;
};

const CharacterRef: React.FC = () => {
    const params = useParams<CharacterParams>();
    const navigate = useNavigate();
    const characters = React.useContext(CharacterContext);
    const [RefComponent, setRefComponent] =
        React.useState<React.ComponentType<any>>();

    React.useEffect(() => {
        if (!params.character) {
            return;
        }

        try {
            setRefComponent(
                React.lazy(() =>
                    import(
                        /* webpackIgnore: true */ `ref-contents/${params.character}`
                    ).catch((err) => {
                        console.error("Component Failed Loading:", err);
                        return { default: CharacterHasNoRef };
                    })
                )
            );
        } catch {
            console.log("blegh");
        } finally {
        }
    }, [params.character]);

    const character = params.character && characters.get(params.character);

    if (character === "") {
        // If this characters isn't found, or it doesn't have a ref, show 404
        return <NotFound />;
    }

    console.log(RefComponent);

    return (
        <PageWrapper
            color={character?.color ?? "#333333"}
            title={character?.name}
            alignItems="center"
        >
            {RefComponent ? <RefComponent /> : <PageLoader />}
            <Button onClick={() => navigate(`./..`)}>
                Back to Character Page!
            </Button>
        </PageWrapper>
    );
};

export default CharacterRef;
