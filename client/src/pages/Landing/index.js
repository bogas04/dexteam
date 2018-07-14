import React from 'react';
import { css } from 'react-emotion';
import colors from '../../design/colors';

export default class Landing extends React.PureComponent {
  render() {
    return (
      <div
        className={css`
          width: 100vw;
          height: 100vh;
          padding: 10vh 10vw;
          background: linear-gradient(45deg, #7f9a99, #1a67f3);
        `}
      >
        <h1
          className={css`
            color: ${colors.white};
            font-size: 80px;
            font-weight: 100;
          `}
        >
          SwigFit
        </h1>
        <form
          id="login"
          onSubmit={e => {
            e.preventDefault();
            this.props.onLogin({ customerId: e.target.customerId.value });
          }}
        >
          <input
            name="customerId"
            className={css`
              color: ${colors.white};
              outline: none;
              background-color: transparent;
              margin: 10px;
              padding: 10px;
              font-size: 25px;
              font-weight: 100;
              border: none;
              border-bottom: 1px solid ${colors.white};
              ::placeholder {
                color: white;
              }
            `}
            type="text"
            placeholder="Customer ID"
          />
          <button
            className={css`
              background-color: ${colors.orange};
              border: none;
              color: ${colors.white};
              font-size: 25px;
              font-weight: 100;
              padding: 10px;
              margin: 10px;
            `}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}
