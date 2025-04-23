import React from "react";
import GalleryPreviewCard from "components/GalleryPreviewCard";
import "./index.css";

type GalleryPreviewProps = {
    title: string;
};

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ title }) => {
    return (
        <div className="gallery-preview">
            <h3 className="gallery-preview-title">{title}</h3>
            <div className="gallery-preview-cards">
                <GalleryPreviewCard title="DawnWhisker Going to LVFC" />
                <GalleryPreviewCard title="DawnWhisker Cool" />
            </div>
        </div>
    );
};

export default GalleryPreview;
