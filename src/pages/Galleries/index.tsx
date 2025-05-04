import React from "react";
import PageWrapper from "components/PageWrapper";
import GalleryPreview from "components/GalleryPreview";
import { Galleries as GalleryContent } from "appConstants";

const Galleries: React.FC = () => {
    const galleryPreviews = Object.keys(GalleryContent).map((galleryId) => {
        return <GalleryPreview id={galleryId} />;
    });
    return (
        <PageWrapper color="#f59e3d" title="Galleries">
            {galleryPreviews}
        </PageWrapper>
    );
};

export default Galleries;
