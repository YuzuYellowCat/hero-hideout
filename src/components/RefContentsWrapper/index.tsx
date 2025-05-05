import React from "react";
import "./index.css";

const RefContentsWrapper: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return <div className="ref-contents">{children}</div>;
};

export default RefContentsWrapper;
