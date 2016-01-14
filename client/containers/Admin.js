import React, { Component, PropTypes } from 'react';
import Radium, { Style } from 'radium';
import adminLayoutStyle from '../styles/admin/layout';

const styles = {
  base: {
    padding: 20,
  },
};

@Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="app-root" style={style.base}>
        <Style rules={adminLayoutStyle} />
        Admin
        {this.props.children}
      </div>
    );
  }
}
