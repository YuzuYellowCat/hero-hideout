import React from "react";
import Header from "components/Header";
import type { PropsWithChildren } from "react";
import "./index.css";
import Section from "components/Section";

type PageWrapperProps = {
    color: string;
    title: string;
};

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = ({
    children,
    color,
    title,
}) => {
    return (
        <div className="page">
            <Header selected={title} borderColor={color} />
            <Section color={color} title={title}>
                {children}
            </Section>
        </div>
    );
};

export default PageWrapper;
