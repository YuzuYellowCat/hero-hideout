import React, { useState, useEffect } from "react";
import PageWrapper from "components/PageWrapper";
import { useParams } from "react-router";
import NotFound from "pages/NotFound";
import fetch from "utils/fetch";
import Link from "components/Link";
import Button from "components/Button";
import CreditSection from "pages/CreditSection";

type CreditParams = {
    credit: string;
};

const Credit: React.FC = () => {
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
            <CreditSection title="Links">
                {Object.entries(credit.links)
                    .sort()
                    .map(([type, url]) => (
                        <Link href={url} key={type}>
                            {type}
                        </Link>
                    ))}
            </CreditSection>
        );
    }, [credit?.links]);

    const charactersComp = React.useMemo(() => {
        if (!credit?.characters) {
            return;
        }
        return (
            <CreditSection title="Appearances">
                {credit.characters.map((character) => (
                    <Button
                        onClick={() => {}}
                        color={character.color}
                        key={character.characterId}
                    >
                        {character.name}
                    </Button>
                ))}
            </CreditSection>
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

export default Credit;
