import React from "react";
import GalleryPreviewCard from "components/GalleryPreviewCard";
import "./index.css";
import { GalleryID, Galleries } from "appConstants";
import { useNavigate } from "react-router";

type GalleryPreviewProps = {
    id: GalleryID;
};

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ id }) => {
    const navigate = useNavigate();
    const galleryInfo = Galleries[id];
    return (
        <div className="gallery-preview">
            <div
                className="gallery-preview-title"
                onClick={() => navigate(`/galleries/${id}`)}
            >
                <h3 className="gallery-preview-title-text">
                    {galleryInfo.title}
                </h3>
                <span className="gallery-preview-title-flourish">›</span>
                <div className="gallery-preview-title-bg" />
            </div>
            <div className="gallery-preview-cards">
                <GalleryPreviewCard
                    title="Test Img 1"
                    src={galleryInfo.placeholder}
                />
                <GalleryPreviewCard
                    title="Test Img 2"
                    src={galleryInfo.placeholder}
                />
            </div>
        </div>
    );
};

export default GalleryPreview;
