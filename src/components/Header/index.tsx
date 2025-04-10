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
    Test: "/",
    About: "/about",
};

const Header: React.FC<HeaderProps> = ({ borderColor, selected }) => {
    const navigate = useNavigate();

    const links = Object.entries(HeaderLinks).map(([key, value]) => {
        const isSelected = key === selected;
        const style = isSelected
            ? {
                  backgroundColor: borderColor,
              }
            : {
                  color: borderColor,
              };
        return (
            <div
                style={style}
                className={`link${isSelected ? " selected" : ""}`}
                key={key}
                onClick={() => navigate(value)}
            >
                {key}
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
