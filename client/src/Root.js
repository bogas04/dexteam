import React from 'react';
import { injectGlobal } from 'react-emotion';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Summary from './pages/Summary';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  }
`;

export default class Root extends React.PureComponent {
  static PAGES = {
    LANDING: 0,
    HOME: 1,
    SUMMARY: 2,
  };
  state = {
    customerId: null,
    page: Root.PAGES.LANDING,
  };

  render() {
    const { PAGES } = Root;
    const { page, customerId } = this.state;

    switch (page) {
      case PAGES.LANDING:
        return (
          <Landing
            onLogin={({ customerId }) =>
              this.setState({ customerId, page: PAGES.HOME })
            }
          />
        );
      case PAGES.HOME:
        return (
          <Home
            customerId={customerId}
            onSummary={() => this.setState({ page: PAGES.SUMMARY })}
            onLogout={() =>
              this.setState({ customerId: null, page: PAGES.LANDING })
            }
          />
        );
      case PAGES.SUMMARY:
        return (
          <Summary
            customerId={customerId}
            onBack={() => this.setState({ page: PAGES.HOME })}
          />
        );
    }
  }
}
