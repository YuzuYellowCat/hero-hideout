import React from "react";
import "./index.css";
import classNames from "classnames";

type LoadingBoxProps = {
    className?: string;
};

const LoadingBox: React.FC<LoadingBoxProps> = ({ className }) => {
    return <div className={classNames("loading-box", className)} />;
};

export default LoadingBox;
