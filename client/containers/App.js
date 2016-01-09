import React, { Component, PropTypes } from 'react';
import Radium, { Style } from 'radium';
import layoutStyle from '../styles/layout';

const styles = {
  base: {
    backgroundColor: 'black',
    padding: 20,
    color: 'white',
    fontWeight: 'bold',
  },
};

@Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="app-root" style={styles.base}>
        <Style rules={layoutStyle} />
        <div className="app-header">App</div>
        {this.props.children}
      </div>
    );
  }
}
