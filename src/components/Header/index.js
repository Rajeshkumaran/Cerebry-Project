import React from "react";
import styled from "react-emotion";
import { COLORS } from "../../constants";
const Wrap = styled("div")`
  position: relative;
  top: 0;
  width: 100%;
  height: 6.2rem;
  background: ${COLORS.CEREBRY_THEME_BLUE};
  display: flex;
  align-items: center;
`;
const Item = styled("li")`
  margin-left: 4.4rem;
  color: #fff;
  font-size: 2rem;
`;
const LogoWrap = styled("div")`
  width: 10rem;
  margin-left: 4.2rem;
`;
const Logo = styled("img")`
  width: 100%;
  height: 100%;
`;
function Header() {
  return (
    <Wrap>
      <LogoWrap>
        <Logo src="https://www.cerebry.co/images-cerebry/logo_new_white.svg" />
      </LogoWrap>
      <Item>Pythagoras Theorm</Item>
    </Wrap>
  );
}
export default Header;
