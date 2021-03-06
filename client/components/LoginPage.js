// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';

// Actions
import { loginWithPassword, setFlash } from '../actions';
import { routeActions } from 'redux-simple-router';

// Styles
import v from '../styles/layout';

@Radium
class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    routing: PropTypes.object,
    auth: PropTypes.object,
  };

  static initialState = {
    username: '',
    password: '',
  };

  loggedIn = () => {
    const pathname = this.props.routing.state && this.props.routing.state.nextPathname
    ? this.props.routing.state.nextPathname
    : '/';
    this.props.dispatch(routeActions.push({ pathname }));
    this.props.dispatch(setFlash({ message: `Welcome ${this.props.auth.user.username}` }));
  };

  handleSubmit = () => {
    this.props.dispatch(
      loginWithPassword({
        username: this.state.username,
        password: this.state.password,
      }, () => {
        if (this.props.auth.loggedIn) {
          this.loggedIn();
        } else {
          if (this.props.auth.message) {
            this.props.dispatch(setFlash({ message: this.props.auth.message, type: 'error' }));
          }
        }
      })
    );
  };

  handleChange = (ev) => {
    this.state[ev.target.dataset.ref] = ev.target.value;
  };

  render() {
    return (
      <div>
        <h2>LoginPage</h2>
        <input
          type="text"
          data-ref="username"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="Username" /><br />
        <input
          type="password"
          data-ref="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="Password" /><br />
        <button type="submit" onClick={this.handleSubmit}>Login</button><br />
        <a href="/api/auth/facebook">Facebook</a>
        <a href="/api/auth/twitter">Twitter</a>
        <Link to="/register">Register</Link>
        <br />
        <Link to="/">Home!</Link>
      </div>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
    routing: state.routing,
  };
}

export default connect(select)(LoginPage);
