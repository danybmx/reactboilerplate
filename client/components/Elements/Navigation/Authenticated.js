// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Radium from 'radium';

const styles = {
  base: {
    height: 40,
    paddingLeft: 190,
    paddingRight: 10,
  },
};

@Radium
class AuthenticatedNavigation extends Component {

  render() {
    return (
      <div style={styles.base}>
        <a href="/api/logout">Logout</a>
      </div>
    );
  }
}

function select(state) {
  return {
    routing: state.routing,
  };
}

export default connect(select)(AuthenticatedNavigation);
