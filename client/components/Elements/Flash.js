// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { clearFlash } from '../../actions';

const styles = {
  base: {
    padding: 10,
  },
  hidden: {
    display: 'none',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
};

@Radium
class Flash extends Component {
  static propTypes = {
    flash: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  handleClick = () => {
    this.props.dispatch(clearFlash());
  };

  render() {
    const flashStyle = [];
    if (this.props.flash.message) {
      flashStyle.push(styles.base);

      flashStyle.push(styles[this.props.flash.type]
        ? styles[this.props.flash.type]
        : {});

      flashStyle.push(this.props.flash.style);
    } else {
      flashStyle.push(styles.hidden);
    }

    return (
      <div style={flashStyle}>
        {this.props.flash.message}
        <button onClick={this.handleClick}>Close</button>
      </div>
    );
  }
}

function select(state) {
  return {
    flash: state.flash,
  };
}

export default connect(select)(Flash);
