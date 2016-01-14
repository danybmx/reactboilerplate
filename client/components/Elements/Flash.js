import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Flash extends Component {
  static propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}

function select(state) {
  return {
    message: state.flash.message,
    type: state.flash.type,
    style: state.flash.style,
  };
}

export default connect(select)(Flash);
