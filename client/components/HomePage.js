// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';

// Styles
import v from '../styles/layout';

@Radium
class HomePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div style={v.container}>
        Hello, I'm the homePage<br />
        <Link to="/login">Login!</Link>
        {this.props.user.username}
      </div>
    );
  }
}

function select(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(select)(HomePage);
