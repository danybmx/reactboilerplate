// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

import Radium from 'radium';

// Actions
import { logout } from '../../../actions';

const styles = {
  base: {
    height: 40,
    paddingLeft: 190,
    paddingRight: 10,
  },
};

@Radium
class AuthenticatedNavigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  handleClick = (ev) => {
    switch (ev.target.dataset.ref) {
      case 'logout':
        return this.props.dispatch(logout(() => {
          this.props.dispatch(routeActions.push({
            pathname: '/login',
            state: {
              flash: {
                type: 'success',
                message: 'See you soon',
              },
            },
          }));
        }));
      default:
        return true;
    }
  };

  render() {
    return (
      <div style={styles.base}>
        <button data-ref="logout" onClick={this.handleClick}>Logout</button>
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
