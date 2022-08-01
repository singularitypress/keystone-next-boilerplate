import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./context";

interface IProps {
  id: string;
  title: string;
  subTitle?: string;
  ctaText?: string;
  ctaURL?: string;
  bgLight?: {
    publicUrlTransformed: string;
  };
  bgDark?: {
    publicUrlTransformed: string;
  };
  slug: string;

  className?: string;
}

// Home receives a `posts` prop from `getStaticProps` below
export const Hero = ({
  id,
  title,
  subTitle,
  ctaText,
  ctaURL,
  bgLight,
  bgDark,
  className = "",
}: IProps) => {
  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <div className={`hero ${className}`}>
          <img
            src={
              theme === "dark"
                ? bgDark?.publicUrlTransformed
                : bgLight?.publicUrlTransformed
            }
            className="hero__img"
          />
          <div className="hero__content">
            <div className="hero__content-container">
              <h1 className="hero__title">{title}</h1>
              <div className="hero__subtitle">
                <p>{subTitle}</p>
              </div>
              <a href={ctaURL} className="hero__cta">
                {ctaText}
              </a>
              <button
                onClick={() => {
                  theme === "dark" ? setTheme("light") : setTheme("dark");
                }}
              >
                toggle
              </button>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
