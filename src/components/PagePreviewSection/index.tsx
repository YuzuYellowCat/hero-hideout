import React from "react";
import "./index.css";
import { useNavigate } from "react-router";

type PagePreviewSectionProps = {
    title: string;
    navigationPath: string;
    color?: string;
    hasFlourish?: boolean;
};

const PagePreviewSection: React.FC<
    React.PropsWithChildren<PagePreviewSectionProps>
> = ({
    title,
    navigationPath,
    children,
    hasFlourish = true,
    color = "#fff",
}) => {
    const navigate = useNavigate();
    return (
        <div
            className="page-preview"
            style={{
                borderColor: color,
            }}
        >
            <div
                className="page-preview-title"
                onClick={() => navigate(navigationPath)}
            >
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
        </div>
    );
};

export default PagePreviewSection;
