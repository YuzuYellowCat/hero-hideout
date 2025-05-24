import React, { ReactElement } from "react";
import PageWrapper from "components/PageWrapper";
import CharacterPreview from "components/CharacterPreview";
import "./index.css";
import Link from "components/Link";
import { CharacterContext } from "contexts/CharacterContext";

const Characters: React.FC = () => {
    const characters = React.useContext(CharacterContext);

    let characterPreviews: ReactElement[] = [];

    characters.forEach((character) => {
        characterPreviews.push(<CharacterPreview character={character} />);
    });

    return (
        <PageWrapper color="#ebfffe" title="Characters" alignItems="center">
            <div className="characters-wrapper">{characterPreviews}</div>
            <p>
                Icons by{" "}
                <Link href="https://bsky.app/profile/kiyonescarlet.bsky.social">
                    KiyoneScarlet
                </Link>
            </p>
        </PageWrapper>
    );
};

export default Characters;
