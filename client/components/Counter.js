import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCount, fetchCountAdd } from '../actions';

class Counter extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    inc: PropTypes.number.isRequired,
  };

  handleClick(a) {
    switch (a) {
      case 'add':
        return this.props.dispatch(fetchCountAdd());
      default:
        return this.props.dispatch(fetchCount());
    }
  }

  render() {
    return (
      <div>
        Fetching: {this.props.isFetching ? 'YES' : 'NO'}<br />
        Count: {this.props.count}<br />
      <button onClick={this.handleClick.bind(this, 'add')}>Increment by {this.props.inc}</button>
      <button onClick={this.handleClick.bind(this, 'get')}>Get server start</button>
      </div>
    );
  }
}

function select(state) {
  return {
    count: state.counter.count,
    inc: state.counter.inc,
    isFetching: state.counter.isFetching,
  };
}

export default connect(select)(Counter);
