import React from 'react';
import { css } from 'react-emotion';
import colors from '../../design/colors';
import { authenticate, isAuthenticated } from '../../util/api';
import Button from '../../components/Button';

const auth = isAuthenticated();

export default class Landing extends React.PureComponent {
  static STEPS = {
    CONNECT: 0,
    LOGIN: 1,
  };

  state = {
    step: auth !== undefined ? Landing.STEPS.LOGIN : Landing.STEPS.CONNECT,
  };

  render() {
    const { step } = this.state;
    const shouldShowConnect =
      step === Landing.STEPS.CONNECT && auth === undefined;
    const shouldShowLogin = step === Landing.STEPS.LOGIN;

    return (
      <div
        className={css`
          color: ${colors.white};
          width: 100vw;
          height: 100vh;
          padding: 10vh 10vw;
          box-sizing: border-box;
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
        {shouldShowConnect && (
          <React.Fragment>
            <p>In order to read your fitness data, connect with Google Fit.</p>
            <Button onClick={authenticate}>Connect</Button>
            <Button
              secondary
              onClick={() => this.setState({ step: Landing.STEPS.LOGIN })}
            >
              Cancel
            </Button>
          </React.Fragment>
        )}
        {shouldShowLogin && (
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
            <Button>Login</Button>
          </form>
        )}
      </div>
    );
  }
}
