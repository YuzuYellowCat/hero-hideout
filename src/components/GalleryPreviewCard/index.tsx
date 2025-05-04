import React from "react";
import "./index.css";

type GalleryPreviewCardProps = {
    title: string;
    src: string;
};

const GalleryPreviewCard: React.FC<GalleryPreviewCardProps> = ({
    title,
    src,
}) => {
    return (
        <div className="gallery-preview-card">
            <img
                className="gallery-preview-card-img"
                src={require(`images/${src}`)}
                alt="test"
            />
            <div className="gallery-preview-card-title">{title}</div>
        </div>
    );
};

export default GalleryPreviewCard;
