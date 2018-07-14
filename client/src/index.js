import React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "react-emotion";

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  }
`;

const Header = styled.h1`
  margin: 0;
  padding: 20px;
  background: linear-gradient(45deg, #7f9a99, #1a67f3);
  color: #ffffff;
  font-weight: 100;
`;

render(<Header>Hello World</Header>, document.querySelector("#root"));
