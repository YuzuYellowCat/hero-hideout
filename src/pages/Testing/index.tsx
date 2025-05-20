import React from "react";
import PageWrapper from "components/PageWrapper";

const Testing: React.FC = () => {
    const [postImages, setPostImages] = React.useState<any[] | null>(null);
    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT}/api/posts`, {
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
                        src={`${process.env.REACT_APP_ENDPOINT}/api/images/${pi.ImageName}`}
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
