import React from "react";
import styled, { css } from "react-emotion";
import Input from "../Input";
import { COLORS } from "../../constants";
const Wrap = styled("div")`
  font-size: 1.8rem;
  color: red;
  display: flex;
  flex-direction: column;
  margin: 2.4rem;
`;
const InputForm = styled("div")`
  margin: 2.4rem;
  > div {
    margin-bottom: 2.4rem;
  }
`;

const InputA = styled(Input)``;
const InputB = styled(Input)``;

const Calculate = styled("button")`
  border: 0;
  border-width: 0;
  background: ${COLORS.CEREBRY_THEME_BLUE};
  outline: 0;
  border: 1px solid ${COLORS.CEREBRY_THEME_BLUE};
  padding: 1rem;
  color: #fff;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      color: #f9f9fa;
      background: grey;
      cursor: not-allowed;
      border: none;
    `};
`;

export default class ErrorPage extends React.Component {
  state = {
    A: {
      value: "",
      error: false,
    },
    B: {
      value: "",
      error: false,
    },
  };
  onValueChange = (data) => {
    this.setState({
      ...this.state,
      ...data,
    });
  };
  calculate = () => {
    const { A, B } = this.state;
    if (!A.value || !B.value) {
      this.setState({
        A: {
          ...this.state.A,
          error: A.value === "",
        },
        B: {
          ...this.state.B,
          error: B.value === "",
        },
      });
      return;
    }

    // load arguments into store
    if (this.props.submitArguments)
      this.props.submitArguments({
        A: parseInt(A.value, 10),
        B: parseInt(B.value, 10),
      });
  };
  render() {
    const isError = this.state.A.error || this.state.B.error;
    return (
      <Wrap>
        Oops , pythagoras theorm requires atleast 2 inputs ,so that the third
        one can be computed.
        <InputForm>
          <InputA
            name="A"
            onValueChange={this.onValueChange}
            showError={this.state.A.error}
          />
          <InputB
            name="B"
            onValueChange={this.onValueChange}
            showError={this.state.B.error}
          />

          <Calculate
            onClick={isError ? () => {} : this.calculate}
            disabled={isError}
          >
            Calculate
          </Calculate>
        </InputForm>
      </Wrap>
    );
  }
}
