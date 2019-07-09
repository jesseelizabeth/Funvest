import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMostActive } from '../store/mostActive';

class MostActive extends Component {
  componentDidMount() {
    this.props.getMostActive();
  }
  render() {
    const { mostActive } = this.props;
    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {mostActive.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>${stock.latestPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapState = state => ({
  mostActive: state.mostActive.list,
});

const mapDispatch = dispatch => ({
  getMostActive: () => dispatch(getMostActive()),
});

export default connect(
  mapState,
  mapDispatch
)(MostActive);
