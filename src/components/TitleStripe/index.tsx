import React, { PropsWithChildren } from "react";
import "./index.css";

const TitleStripe: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="title-container">
            <div className="title-text">
                <span className="header-title">{children}</span>
                <span className="header-flourish"> </span>
                <div className="stripe-edge" />
            </div>
            <div className="stripe-1">
                <div className="stripe-body" />
                <div className="stripe-edge" />
            </div>
            <div className="stripe-2">
                <div className="stripe-body" />
                <div className="stripe-edge" />
            </div>
        </div>
    );
};

export default TitleStripe;
