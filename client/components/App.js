// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium, { Style } from 'radium';

// Components
import Header from './Elements/Header';
import Flash from './Elements/Flash';
import Page from './Elements/Page';

// Styles
import layoutStyle from '../styles/layout';

const styles = {
  base: {
    minHeight: '100%',
    width: '100%',
    paddingTop: 60,
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
        <Page style={styles.page}>
          {this.props.children}
        </Page>
      </div>
    );
  }
}

export default connect(state => state)(App);
