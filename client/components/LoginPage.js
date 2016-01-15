// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import Radium from 'radium';

// Actions
import { loginWithPassword } from '../actions';

// Styles
import v from '../styles/layout';

@Radium
class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
  };

  static mixins = [History];

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.loggedIn) {
      let pathname = '/';
      if (nextProps.routing.state && nextProps.routing.state.nextPathname !== 'undefined') {
        pathname = nextProps.routing.state.nextPathname;
      }
      this.props.history.push({ pathname, query: {} });
    }
  }

  static initialState = {
    username: '',
    password: '',
  };

  handleSubmit = () => {
    this.props.dispatch(
      loginWithPassword(this.state.username, this.state.password)
    );
  };

  handleChange = (ev) => {
    this.state[ev.target.id] = ev.target.value;
  };

  render() {
    return (
      <div>
        <h2>LoginPage</h2>
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="Username" /><br />
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="Password" /><br />
        <button type="submit" onClick={this.handleSubmit}>Login</button>
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
