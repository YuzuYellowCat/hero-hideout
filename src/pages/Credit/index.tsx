import React, { useState, useEffect } from "react";
import PageWrapper from "components/PageWrapper";
import { useParams } from "react-router";
import NotFound from "pages/NotFound";
import fetch from "utils/fetch";
import Link from "components/Link";
import Button from "components/Button";
import "./index.css";

type CreditParams = {
    credit: string;
};

const CharacterPage: React.FC = () => {
    const params = useParams<CreditParams>();
    const [loading, setLoading] = useState(true);
    const [credit, setCredit] = useState<Credit | null>(null);

    useEffect(() => {
        if (!params.credit) {
            return;
        }
        fetch(`/credits/${params.credit}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((credit) => {
                setCredit(credit);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [params.credit]);

    const linksComponent = React.useMemo(() => {
        if (!credit?.links) {
            return;
        }
        return (
            <>
                <h3 className="section-title">Links:</h3>
                <div className="credit-flex">
                    {Object.entries(credit.links)
                        .sort()
                        .map(([type, url]) => (
                            <Link href={url} key={type}>
                                {type}
                            </Link>
                        ))}
                </div>
            </>
        );
    }, [credit?.links]);

    const charactersComp = React.useMemo(() => {
        if (!credit?.characters) {
            return;
        }
        return (
            <>
                <h3 className="section-title">Appearances:</h3>
                <div className="credit-flex">
                    {credit.characters.map((character) => (
                        <Button
                            onClick={() => {}}
                            color={character.color}
                            key={character.characterId}
                        >
                            {character.name}
                        </Button>
                    ))}
                </div>
            </>
        );
    }, [credit?.characters]);

    if (!params.credit || (!loading && !credit)) {
        // If this character isn't found, show the 404 page
        return <NotFound />;
    }

    return (
        <PageWrapper
            color={credit?.color ?? "#ffffff"}
            title={credit?.name}
            alignItems="center"
        >
            {linksComponent}
            {charactersComp}
        </PageWrapper>
    );
};

export default CharacterPage;
