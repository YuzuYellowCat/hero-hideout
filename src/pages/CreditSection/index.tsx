import React from "react";
import "./index.css";

type CreditSectionProps = {
    title: string;
};

const CreditSection: React.FC<React.PropsWithChildren<CreditSectionProps>> = ({
    title,
    children,
}) => {
    return (
        <>
            <h3 className="section-title">{title}:</h3>
            <div className="credit-flex">{children}</div>
        </>
    );
};

export default CreditSection;
