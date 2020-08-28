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
import Header from "../../components/Header";
import ErrorPage from "../../components/ErrorPage";
import { computeNewArg } from "../../utils/helpers";
const Wrap = styled("div")`
  position: relative;
`;
const TheormContainer = styled("div")`
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
const Formula = styled("div")`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 2.4rem;
  color: ${COLORS.CEREBRY_THEME_BLUE};
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
    promises.push(runSaga(homeSaga, params).done);

    return Promise.all(promises);
  };
  submitArguments = ({ A, B }) => {
    let nA = A;
    let nB = B;
    if (A < B) {
      nA = B;
      nB = A;
    }
    let C = Math.ceil(computeNewArg(A, B));
    this.props.dispatch(
      loadArguments({
        A,
        B,
        C,
        roundedA: A,
        roundedB: B,
        roundedC: C,
        isParamsError: false,
      }),
    );
  };
  render() {
    console.log("Homepage props", this.props.arguments);
    const { arguments: args } = this.props;
    const {
      A,
      B,
      C,
      roundedA,
      roundedB,
      roundedC,
      isParamsError,
      newlyComputed,
    } = args;

    return (
      <Wrap>
        <Header />
        {isParamsError ? (
          <ErrorPage submitArguments={this.submitArguments} />
        ) : (
          <TheormContainer>
            <Formula>
              Formula : a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
            </Formula>
            {newlyComputed && (
              <p
                className={css`
                  font-size: 1.4rem;
                  font-weight: bold;
                `}
              >
                Computed argument : {newlyComputed.toLowerCase()} ={" "}
                {args[newlyComputed]}
              </p>
            )}

            <Triangle {...{ A, B, C, roundedA, roundedB, roundedC }} />
            <DiagonalSquare width={18} top={6.7} left={-7.4} height={20}>
              <Grid
                row={roundedC < 20 ? roundedC : 10}
                rowWidth={18}
                rowHeight={roundedC < 20 ? 20 / roundedC : 20 / 10}
                squareColor={COLORS.RED}
                isDiagonal
                verticalValue={roundedC < 20 ? roundedB : 5}
                squareColor2={COLORS.LIGHT_BLUE}
              />
            </DiagonalSquare>
            <VerticalSqaure width={10} top={0.1} left={15.1} height={10}>
              <Grid
                row={roundedB < 10 ? roundedB : 5}
                rowWidth={10}
                rowHeight={roundedB < 10 ? 10 / roundedB : 10 / 5}
                squareColor={COLORS.LIGHT_BLUE}
              />
            </VerticalSqaure>
            <BaseSquare width={15} left={0} height={15} top={0.2}>
              <Grid
                row={roundedA < 15 ? roundedA : 15}
                rowWidth={15}
                rowHeight={roundedA < 15 ? 15 / roundedA : 15 / 15}
                squareColor={COLORS.RED}
              />
            </BaseSquare>
          </TheormContainer>
        )}
      </Wrap>
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
