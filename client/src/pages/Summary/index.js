import React from 'react';
import Content from '../../components/CoolContent';
import { HeaderButton as Button } from '../../components/Header';
import styled, { css } from 'react-emotion';
import { LoadingView } from '../../components/Loader';
import { getUserSummary } from '../../api/swiggy';

const CoolContent = styled(Content)`
  font-weight: 100;
  padding: 20px;

  h1 {
    font-weight: 400;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 100;
  }
`;

const CoolButton = styled(Button)`
  font-size: 2em;
`;

export default class Summary extends React.PureComponent {
  state = {
    loading: true,
    data: null,
  };
  render() {
    const { loading, data } = this.state;
    return (
      <CoolContent>
        <CoolButton onClick={this.props.onBack}>&lt;</CoolButton>
        <h1
          className={css`
            font-weight: 100;
          `}
        >
          Summary
        </h1>
        {loading ? (
          LoadingView
        ) : (
          <React.Fragment>
            <h2>You've made {data.total_order} orders</h2>
            <h2>You're favorite restaurants</h2>
            <ul style={{ listStyle: 'none' }}>
              {data.top_5_restaurants.map(id => <li key={id}>{id}</li>)}
            </ul>
            <h2>You're favorite food items</h2>
            <ul
              className={css`
                list-style: none;
              `}
            >
              {data.top_5_items.map(id => <li key={id}>{id}</li>)}
            </ul>
            <h2>
              You've spent <strong>{data.total_money_spent}</strong> improving
              your lifestyle!
            </h2>
          </React.Fragment>
        )}
      </CoolContent>
    );
  }

  async componentDidMount() {
    const data = await getUserSummary(this.props.customerId);
    this.setState({ data, loading: false });
  }
}
