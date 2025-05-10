import React from "react";
import "./index.css";
import { useNavigate } from "react-router";

type PagePreviewSectionProps = {
    title: string;
    navigationPath: string;
    color?: string;
    hasFlourish?: boolean;
    fullHover?: boolean;
};

const PagePreviewSection: React.FC<
    React.PropsWithChildren<PagePreviewSectionProps>
> = ({
    title,
    navigationPath,
    children,
    hasFlourish = true,
    fullHover = false,
    color = "#fff",
}) => {
    const navigate = useNavigate();
    return (
        <button
            className="page-preview"
            style={{
                borderColor: color,
            }}
            onClick={() => navigate(navigationPath)}
        >
            <div className="page-preview-title">
                <h3 className="page-preview-title-text">{title}</h3>
                {hasFlourish && (
                    <span className="page-preview-title-flourish">›</span>
                )}
                <div
                    className="page-preview-title-bg"
                    style={{
                        backgroundColor: color,
                    }}
                />
            </div>
            <div className="page-preview-content">{children}</div>
            <div
                className="page-preview-bg"
                style={{
                    backgroundColor: color,
                    opacity: 0.25,
                    display: fullHover ? "flex" : "none",
                }}
            />
        </button>
    );
};

export default PagePreviewSection;
