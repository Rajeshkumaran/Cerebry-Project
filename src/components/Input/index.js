import React, { useState } from "react";
import styled from "react-emotion";
import { COLORS, INPUT_VALIDATION } from "../../constants";

const InputWrapper = styled("div")`
  outline: none;
  display: flex;
  flex-direction: column;
`;
const Input = styled("input")`
  width: 100%;
  outline: none;
  border: none;
  height: 3.4rem;
  border: 1px solid ${COLORS.CEREBRY_THEME_BLUE};
  outline: none;
  max-width: 20rem;
  padding: 0.5rem;
`;
const Error = styled("span")`
  font-size: 1.4rem;
  color: ${COLORS.RED};
  margin-top: 1.2rem;
`;
function InputComponent({ name, showError, onValueChange }) {
  const [inputValue, onChange] = useState("");

  return (
    <InputWrapper>
      <Input
        type="text"
        onChange={(e) => {
          onChange(e.target.value);
          if (onValueChange) {
            onValueChange({
              [name]: {
                value: e.target.value,
                error: !INPUT_VALIDATION.test(e.target.value),
              },
            });
          }
        }}
      />
      {showError && <Error>Provide a valid number(non-negative integer)</Error>}
    </InputWrapper>
  );
}
export default InputComponent;
