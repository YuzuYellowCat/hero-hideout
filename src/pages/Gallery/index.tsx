import React from "react";
import PageWrapper from "components/PageWrapper";
import PostController from "components/PostController";

const Gallery: React.FC = () => {
    return (
        <PageWrapper color="#f59e3d" title="Gallery">
            <PostController />
        </PageWrapper>
    );
};

export default Gallery;
