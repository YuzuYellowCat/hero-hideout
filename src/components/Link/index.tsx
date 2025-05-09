import React, { PropsWithChildren } from "react";
import "./index.css";

type LinkProps = {
    href: string;
};

const Link: React.FC<PropsWithChildren<LinkProps>> = ({ href, children }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
};

export default Link;
