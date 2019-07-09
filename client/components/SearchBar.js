import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ symbol: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              value={this.state.symbol}
              onChange={this.handleChange}
              placeholder="Ticker"
            />
            <button className="teal accent-3 btn-small" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
