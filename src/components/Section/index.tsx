import React from "react";
import type { PropsWithChildren } from "react";
import "./index.css";

const Section: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="section">{children}</div>;
};

export default Section;
