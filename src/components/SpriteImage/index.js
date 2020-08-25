import React from 'react';
import styled from 'react-emotion';
import MainSprite from '../../images/Sprites.png';
const StyledSpan = styled('span')`
  background: url(${MainSprite});
  display: inline-block;
`;
function SpriteImage(props) {
  return <StyledSpan {...props} />;
}
export const HamburgerIcon = styled(SpriteImage)`
  width: 26px;
  height: 26px;
  background-position: -10px -10px;
`;
export const CloseIcon = styled(SpriteImage)`
  width: 16px;
  height: 16px;
  background-position: -56px -10px;
`;
export default SpriteImage;
