import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="app-root" style={styles.root}>
        <div className="app-header">App</div>
        {this.props.children}
      </div>
    );
  }
}
