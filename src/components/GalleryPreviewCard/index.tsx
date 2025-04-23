import React from "react";
import "./index.css";

type GalleryPreviewCardProps = {
    title: string;
};

const GalleryPreviewCard: React.FC<GalleryPreviewCardProps> = ({ title }) => {
    return (
        <div className="gallery-preview-card">
            <img
                className="gallery-preview-card-img"
                src={require("images/cat-placeholder.png")}
                alt="test"
            />
            <div className="gallery-preview-card-title">{title}</div>
        </div>
    );
};

export default GalleryPreviewCard;
