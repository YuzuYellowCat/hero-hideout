import React from "react";
import Header from "components/Header";
import type { PropsWithChildren } from "react";
import "./index.css";
import Section from "components/Section";

type PageWrapperProps = {
    color: string;
    title?: string;
    alignItems?: "start" | "end" | "center" | "inherit";
};

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = ({
    children,
    color,
    title,
    alignItems = "inherit",
}) => {
    return (
        <div className="page">
            <Header selected={title ?? ""} borderColor={color} />
            <Section color={color} title={title}>
                <div
                    className="page-contents"
                    style={{
                        alignItems,
                    }}
                >
                    {children}
                </div>
            </Section>
        </div>
    );
};

export default PageWrapper;
