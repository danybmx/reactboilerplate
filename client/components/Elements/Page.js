import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

// Styles
import v from '../../styles/layout';

const styles = {
  base: {
    padding: 10,
  },
};

@Radium
class Page extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <section style={[styles.base, v.container]}>
        {this.props.children}
      </section>
    )
  }
}

export default connect()(Page);
