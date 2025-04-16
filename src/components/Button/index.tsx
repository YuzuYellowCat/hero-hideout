import React from "react";
import type { PropsWithChildren } from "react";
import classNames from "classnames";
import "./index.css";

type ButtonProps = {
    color?: string;
    variant?: "primary" | "secondary";
    quiet?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    children,
    color = "#ffffff",
    variant = "primary",
    quiet = false,
    onClick,
}) => {
    const buttonColorStyle = quiet
        ? {
              borderColor: color,
              color,
          }
        : {
              borderColor: color,
              backgroundColor: color,
          };
    return (
        <button
            className={classNames("button", {
                [`button-${variant}`]: true,
                "button-quiet": quiet,
            })}
            style={buttonColorStyle}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
