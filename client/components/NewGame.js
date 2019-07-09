import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGame } from '../store/games';

class NewGame extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      startingBalance: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleClick() {
    const { name } = this.state;
    const startingBalance = Number(this.state.startingBalance);
    this.props.createGame({ name, startingBalance });
    this.setState({ name: '', startingBalance: '' });
  }
  render() {
    return (
      <div>
        <h4>New Game</h4>
        <div className="card-panel">
          <form>
            <input
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              type="text"
              placeholder="Name the Game"
            />
            <input
              value={this.state.startingBalance}
              name="startingBalance"
              onChange={this.handleChange}
              type="text"
              placeholder="Starting balance"
            />
            <button
              className="prefix teal accent-3 btn-small"
              type="button"
              onClick={this.handleClick}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  createGame,
};

export default connect(
  null,
  mapDispatch
)(NewGame);
