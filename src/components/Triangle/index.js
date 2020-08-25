import React from "react";
import styled, { css } from "react-emotion";
const Wrap = styled("div")`
  position: relative;
`;
const BaseSpan = styled("span")`
  display: inline-block;
  position: absolute;
  height: 2px;
  top: 0;
  width: ${(props) => props.width}rem;
  text-align: center;
`;
const Line = styled(BaseSpan)`
  background: #000;
`;
const baseCss = (props) => css`
  top: ${props.top}rem;
`;
const verticalCss = (props) => css`
  transform: rotate(90deg);
  left: ${props.left}rem;
  top: ${props.top}rem;
`;
const diagonalCss = (props) => css`
  transform: rotate(-34deg);
  left: ${props.left}rem;
  top: ${props.top}rem;
`;

const BaseLine = styled(Line)`
  ${(props) => baseCss(props)}
`;
const VerticalLine = styled(Line)`
  ${(props) => verticalCss(props)}
`;
const DiagonalLine = styled(Line)`
  ${(props) => diagonalCss(props)}
`;

const BaseValue = styled(BaseSpan)`
  ${(props) => baseCss(props)}
`;
const VerticalValue = styled(BaseSpan)`
  ${(props) => verticalCss(props)};
  transform: none;
`;
const DiagonalValue = styled(BaseSpan)`
  ${(props) => diagonalCss(props)}
  transform: none;
`;

export default class Triangle extends React.Component {
  render() {
    const { A, B, C } = this.props;
    return (
      <Wrap>
        <BaseLine width={15} top={30}></BaseLine>
        <VerticalLine width={10} left={9.85} top={25}></VerticalLine>
        <DiagonalLine width={18} left={-1.6} top={24.97}></DiagonalLine>

        <BaseValue width={15} top={28}>
          {A}
        </BaseValue>
        <VerticalValue width={10} left={8.4} top={25}>
          {B}
        </VerticalValue>
        <DiagonalValue width={18} left={-1.2} top={24.97}>
          {C}
        </DiagonalValue>
      </Wrap>
    );
  }
}
