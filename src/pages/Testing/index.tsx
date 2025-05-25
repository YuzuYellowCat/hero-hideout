import React from "react";
import PageWrapper from "components/PageWrapper";
import fetch, { getImageUrl } from "utils/fetch";

const Testing: React.FC = () => {
    const [postImages, setPostImages] = React.useState<any[] | null>(null);
    React.useEffect(() => {
        fetch("/posts", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((posts) => {
                setPostImages(posts);
            });
    }, []);

    const content =
        postImages &&
        postImages.map((pi) => {
            const date = new Date(pi.Date * 1000);
            return (
                <div key={pi.ImageId}>
                    <img
                        style={{ width: 200, height: 200 }}
                        src={getImageUrl(pi.ImageName)}
                        alt={pi.AltText}
                    />
                    <span>{pi.Title}</span>
                    <span>
                        {date.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                </div>
            );
        });

    return (
        <PageWrapper color="#ffffff" title="Testing" alignItems="center">
            {content}
        </PageWrapper>
    );
};

export default Testing;
