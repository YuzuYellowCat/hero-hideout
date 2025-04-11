import React from "react";
import "./index.css";
import Section from "components/Section";
import TitleStripe from "components/TitleStripe";
import { useNavigate } from "react-router";

type HeaderProps = {
    borderColor: string;
    selected: string;
};

const HeaderLinks = {
    Home: "/",
    About: "/about",
};

const Header: React.FC<HeaderProps> = ({ borderColor, selected }) => {
    const navigate = useNavigate();

    const links = Object.entries(HeaderLinks).map(([key, value]) => {
        const isSelected = key === selected;
        return (
            <div
                style={isSelected ? {} : { color: borderColor }}
                className={`link${isSelected ? " selected" : ""}`}
                key={key}
                onClick={() => navigate(value)}
            >
                <span className="link-text">{key}</span>
                <div
                    className="link-background"
                    style={isSelected ? { backgroundColor: borderColor } : {}}
                />
            </div>
        );
    });

    return (
        <Section color={borderColor}>
            <TitleStripe>YuzuCat</TitleStripe>
            <div className="links">{links}</div>
        </Section>
    );
};

export default Header;
