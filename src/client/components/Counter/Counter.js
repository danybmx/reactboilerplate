import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    this.setState({
      count: this.state.count + 2,
    });
  }

  render() {
    return (
      <div>
        Counter: {this.state.count}
        <button onClick={this.handleClick.bind(this)}>Increment</button>
      </div>
    );
  }
}
