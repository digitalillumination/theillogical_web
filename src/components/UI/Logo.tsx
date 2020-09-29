import React from "react";
import styled, { css } from "styled-components";
// @ts-ignore
import logo from "../../assets/logo.png";

interface LogoProps {
  size?: number;
}
function Logo(props: LogoProps) {
  return <LogoImage {...props} />;
}

const LogoImage = styled.div<LogoProps>`
  background: url(${logo}) no-repeat;
  background-size: contain;
  ${(props) => {
    const size = props.size || 300;

    return css`
      width: ${size * 5.8988095238}px;
      height: ${size}px;
    `;
  }}
`;

export default Logo;
