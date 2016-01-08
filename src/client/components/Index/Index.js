import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Index extends Component {
  render() {
    return (
      <div>
        <Link to="/counter">Go Counter!</Link>
        <Link to="/admin">Go Admin!</Link>
      </div>
    );
  }
}
