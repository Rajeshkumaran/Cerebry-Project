import React from "react";
import styled from "react-emotion";
import Square from "../Square";
const Row = styled("div")`
  display: flex;
  width: ${(props) => props.rowWidth}rem;
  height: ${(props) => props.rowHeight}rem;
`;
const Column = styled("div")`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.columnWidth}rem;
  height: ${(props) => props.columnHeight}rem;
`;
function Grid({
  row,
  rowWidth = 0,
  rowHeight = 0,
  squareColor,
  isDiagonal = false,
  squareColor2,
  verticalValue,
}) {
  const constructGrid = () => {
    return Array(row)
      .fill(0)
      .map((c, ci) => {
        return (
          <Row rowWidth={rowWidth} rowHeight={rowHeight}>
            {Array(row)
              .fill(0)
              .map((r, ri) => {
                let color = squareColor;
                if (isDiagonal && verticalValue > 0) {
                  color =
                    ci + 1 <= verticalValue &&
                    (ci + 1) * (ri + 1) <= (ci + 1) * verticalValue
                      ? squareColor2
                      : squareColor;
                }
                return (
                  <Column columnWidth={rowWidth / row} columnHeight={rowHeight}>
                    <Square color={color}></Square>
                  </Column>
                );
              })}
          </Row>
        );
      });
  };

  return constructGrid();
}
export default Grid;
