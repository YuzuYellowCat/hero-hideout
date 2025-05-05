import React from "react";
import GalleryPreviewCard from "components/GalleryPreviewCard";
import { GalleryID, Galleries } from "appConstants";
import PagePreviewSection from "components/PagePreviewSection";

type GalleryPreviewProps = {
    id: GalleryID;
};

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ id }) => {
    const galleryInfo = Galleries[id];
    return (
        <PagePreviewSection
            title={galleryInfo.title}
            navigationPath={`/galleries/${id}`}
        >
            <GalleryPreviewCard title="Test 1" src={galleryInfo.placeholder} />
            <GalleryPreviewCard title="Test 2" src={galleryInfo.placeholder} />
        </PagePreviewSection>
    );
};

export default GalleryPreview;
