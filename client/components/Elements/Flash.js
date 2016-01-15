// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

const styles = {
  base: {
    padding: 10,
  },
  hidden: {
    display: 'none',
  },
};

@Radium
class Flash extends Component {
  static propTypes = {
    flash: PropTypes.any,
    dispatch: PropTypes.func,
  };

  state = {
    visible: true,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.flash !== this.props.flash) {
      this.setState({ visible: true });
    }
  };

  handleClick = () => {
    this.setState({ visible: false });
  };

  render() {
    let message;
    if (this.props.flash && this.state.visible) {
      message = `${this.props.flash.message} - ${this.props.flash.type}`;
    }
    return (
      <div style={[
        this.props.flash && this.state.visible ? styles.base : styles.hidden,
      ]}>
        {message}
        <button onClick={this.handleClick}>Close</button>
      </div>
    );
  }
}

function select(state) {
  return {
    flash: state.routing && state.routing.location.state
      ? state.routing.location.state.flash
      : false,
  };
}

export default connect(select)(Flash);
