// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';

// Styles
import v from '../styles/layout';

@Radium
class RegisterPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  render() {
    return (
      <div>
        Hello, I'm the registerPage<br />
        <Link to="/login">Login!</Link>
      </div>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}

export default connect(select)(RegisterPage);
