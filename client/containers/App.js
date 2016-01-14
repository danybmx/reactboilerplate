// Dependencies
import React, { Component, PropTypes } from 'react';
import Radium, { Style } from 'radium';

// Components
import Header from '../components/Header';

// Styles
import layoutStyle from '../styles/layout';

const styles = {
  base: {
    minHeight: '100%',
    width: '100%',
    paddingTop: 70,
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
        <Header />
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
