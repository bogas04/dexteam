import React from 'react';
import { injectGlobal } from 'react-emotion';
import Landing from './pages/Landing';
import Home from './pages/Home';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  }
`;

export default class Root extends React.PureComponent {
  state = {
    customerId: null,
  };

  render() {
    return this.state.customerId === null ? (
      <Landing onLogin={({ customerId }) => this.setState({ customerId })} />
    ) : (
      <Home customerId={this.state.customerId} />
    );
  }
}
