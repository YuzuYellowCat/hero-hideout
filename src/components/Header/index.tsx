import React from "react";
import "./index.css";
import Section from "components/Section";

const Header: React.FC = () => {
    return (
        <Section>
            <div className="title-container">
                <div className="title-text">
                    <span className="header-title">YuzuCat</span>
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
        </Section>
    );
};

export default Header;
