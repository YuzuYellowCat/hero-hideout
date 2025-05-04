import React from "react";
import PageWrapper from "components/PageWrapper";
import { useParams } from "react-router";
import { Galleries } from "appConstants";
import NotFound from "pages/NotFound";

type GalleryParams = {
    gallery: string;
};

const GalleryPage: React.FC = () => {
    const params = useParams<GalleryParams>();

    const galleryInfo = params.gallery && Galleries[params.gallery];
    if (!galleryInfo) {
        // If this gallery isn't found,
        return <NotFound />;
    }

    return (
        <PageWrapper color="#ffffff" title={galleryInfo.title}>
            This is a test gallery page ig
        </PageWrapper>
    );
};

export default GalleryPage;
