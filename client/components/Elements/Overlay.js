// Depenencies
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
};

@Radium
export default class Overlay extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    background: PropTypes.string,
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  };

  static defaultProps = {
    opacity: 0.5,
    background: '#FFFFFF',
    zIndex: 0,
  };

  render() {
    return (
      <div style={[
        styles.base,
        { opacity: this.props.opacity },
        { backgroundColor: this.props.background },
        { zIndex: this.props.zIndex },
      ]} onClick={this.props.clickHandler}></div>
    );
  }
}
