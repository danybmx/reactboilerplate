// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';

// Components
import PublicNavigation from './Navigation/Public';
import AuthenticatedNavigation from './Navigation/Authenticated';

// Style variables
import v from '../../styles/variables';

const styles = {
  base: {
    position: 'fixed',
    height: 60,
    padding: 10,
    width: '100%',
    top: 0,
    left: 0,
    boxShadow: '0 0 2px rgba(0,0,0,.3)',
    backgroundColor: v.mainColor,
    color: '#FFF',
  },
  container: v.container,
  logoContainer: {
    float: 'left',
    marginRight: 10,
  },
  logo: {
    height: 40,
  },
};

@Radium
class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    let Navigation = <PublicNavigation />;
    if (this.props.user) {
      Navigation = <AuthenticatedNavigation />;
    }

    return (
      <header style={styles.base}>
        <div style={styles.container}>
          <div style={styles.logoContainer}>
            <Link to="/">
              <img src="/assets/img/logo-header.png" alt="SPVtracking" style={styles.logo} />
            </Link>
          </div>
          { Navigation }
        </div>
      </header>
    );
  }
}

function select(state) {
  return {
    user: state.user,
  };
}

export default connect(select)(Header);
