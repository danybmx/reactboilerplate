// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium, { Style } from 'radium';

// Components
import Header from './Elements/Header';
import Flash from './Elements/Flash';

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
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    auth: PropTypes.object,
    routing: PropTypes.object,
  };

  render() {
    return (
      <div className="app-root" style={styles.base}>
        <Style rules={layoutStyle} />
        <Header />
        <Flash />
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => state)(App);
