import React from "react";
import type { PropsWithChildren } from "react";
import "./index.css";

type SectionProps = {
    color: string;
    title?: string;
};

const Section: React.FC<PropsWithChildren<SectionProps>> = ({
    children,
    color,
    title,
}) => {
    return (
        <div
            className="section"
            style={{
                borderColor: color,
            }}
        >
            {title && (
                <span style={{ color }} className="section-title">
                    {title} › › ›
                </span>
            )}
            {children}
        </div>
    );
};

export default Section;
