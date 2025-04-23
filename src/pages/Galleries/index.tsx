import React from "react";
import PageWrapper from "components/PageWrapper";
import GalleryPreview from "components/GalleryPreview";

const Galleries: React.FC = () => {
    return (
        <PageWrapper color="#f59e3d" title="Galleries">
            <GalleryPreview title="Fursuit Pictures" />
        </PageWrapper>
    );
};

export default Galleries;
