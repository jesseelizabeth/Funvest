import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/user';
import Search from './Search';

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
        <nav className="nav-wrapper teal accent-4">
          <div className="container">
            <Link to="/home" className="brand-logo">
              Funvest
            </Link>
            {isLoggedIn ? (
              <div>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <Link to="/home">Game Center</Link>
                  </li>
                  <li>
                    <a href="#" onClick={this.handleClick}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            )}
          </div>
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
