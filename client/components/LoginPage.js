// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';

// Styles
import v from '../styles/layout';

@Radium
class HomePage extends Component {
  render() {
    return (
      <div>
        Hello, I'm the loginPage<br />
        <Link to="/">Home!</Link>
      </div>
    );
  }
}

function select(state) {
  return {
    user: state.user,
  };
}

export default connect(select)(HomePage);
