import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/user';

class Navbar extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.logout();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <div className="nav-wrapper teal accent-4">
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to="/home">Home</Link>
                </li>

                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link to="/transactions">Transactions</Link>
                </li>
                <li>
                  <a href="#" onClick={this.handleClick}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="nav-wrapper teal accent-4">
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapState,
  mapDispatch
)(Navbar);
