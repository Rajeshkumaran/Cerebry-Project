import React from "react";
import styled from "react-emotion";
const Wrap = styled("li")`
  width: 100%;
  height: 100%;
  background: ${(props) => props.color};
  color: #000;
  border: 0.3px solid #000;
`;
function Square({ color = "#000", children }) {
  return <Wrap color={color}>{children}</Wrap>;
}
export default Square;
