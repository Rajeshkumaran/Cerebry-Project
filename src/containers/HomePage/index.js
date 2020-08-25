import React from "react";
import styled, { css } from "react-emotion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectHomePageState, selectArguments } from "../../selectors";
import { homeSaga } from "./saga";
import { loadArguments } from "./actions";
import Square from "../../components/Square";
import { COLORS } from "../../constants";
import Triangle from "../../components/Triangle";
import Grid from "../../components/Grid";
const Container = styled("div")`
  width: 100%;
  margin: 100px;
  margin-left: 400px;
`;
const DiagonalSquare = styled("div")`
  width: ${(props) => props.width}rem;
  transform: rotate(-34deg);
  height: ${(props) => props.height}rem;
  position: relative;
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;
  background: #fff;
  border: 0.5px solid #000;
`;

const VerticalSqaure = styled("div")`
  width: ${(props) => props.width}rem;
  transform: rotate(90deg);
  height: ${(props) => props.height}rem;
  position: relative;
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;
  background: ${COLORS.LIGHT_BLUE};
  border: 0.5px solid #000;
`;
const BaseSquare = styled("div")`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  position: relative;
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;
  background: ${COLORS.RED};
  border: 0.5px solid #000;
`;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  static fetchData = (match, store, { params }) => {
    const { runSaga } = store;
    const promises = [];
    console.log("debugger fetchData", params);
    promises.push(runSaga(homeSaga, params).done);

    return Promise.all(promises);
  };
  render() {
    console.log("Homepage props", this.props);
    const { arguments: args } = this.props;
    const { a = 4, b = 3, c = 5 } = args;
    const A = parseInt(a, 10);
    const B = parseInt(b, 10);
    const C = parseInt(c, 10);
    return (
      <Container>
        <Triangle {...{ A, B, C }} />
        <DiagonalSquare width={18} top={6.7} left={-7.4} height={20}>
          <Grid
            row={C < 20 ? C : 10}
            rowWidth={18}
            rowHeight={C < 20 ? 20 / C : 20 / 10}
            squareColor={COLORS.RED}
            isDiagonal
            verticalValue={C < 20 ? B : 5}
            squareColor2={COLORS.LIGHT_BLUE}
          />
        </DiagonalSquare>
        <VerticalSqaure width={10} top={0.1} left={15.1} height={10}>
          <Grid
            row={B < 10 ? B : 5}
            rowWidth={10}
            rowHeight={B < 10 ? 10 / B : 10 / 5}
            squareColor={COLORS.LIGHT_BLUE}
          />
        </VerticalSqaure>
        <BaseSquare width={15} left={0} height={15} top={0.2}>
          <Grid
            row={A < 15 ? A : 15}
            rowWidth={15}
            rowHeight={A < 15 ? 15 / A : 15 / 15}
            squareColor={COLORS.RED}
          />
        </BaseSquare>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homePage: selectHomePageState(state),
    arguments: selectArguments(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
HomePage.propTypes = {
  route: PropTypes.object,
};
