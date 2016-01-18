import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import v from '../../styles/variables';

const styles = {
  base: Object.assign({}, v.button, {
    cursor: 'pointer',
  }),
  iconOnly: {
    marginLeft: -5,
    marginRight: -5,
  },
  icon: {
    marginLeft: -5,
  },
};

@Radium
class Button extends Component {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const buttonStyle = [
      styles.base,
      this.props.type ? styles[this.props.type] : '',
      this.props.style || {},
    ];

    const icon = this.props.icon
      ? <i className={'fa fa-fw fa-' + this.props.icon} style={!this.props.children ? styles.iconOnly : styles.icon} />
      : ''

    return (
      <button onClick={this.props.onClick} style={buttonStyle}>{icon}{this.props.children}</button>
    );
  }
}

export default Button;
