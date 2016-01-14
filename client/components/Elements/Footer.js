// Dependencies
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

// Style variables
import v from '../../styles/variables';

const styles = {
  base: {
    background: 'black',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
};

@Radium
export default class Footer extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    return (
      <footer style={styles.base}>
        <div style={styles.container}>
        </div>
      </footer>
    );
  }
}
