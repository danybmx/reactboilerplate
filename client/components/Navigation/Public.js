// Dependencies
import React, { Component } from 'react';
import Radium from 'radium';

// Components
import LanguageSelector from '../LanguageSelector';

// Style variables
import v from '../../styles/variables';

const styles = {
  base: {
    height: 40,
    paddingLeft: 190,
    paddingRight: 10,
  },
};

@Radium
export default class PublicNavigation extends Component {
  render() {
    return (
      <div style={styles.base}>
        <LanguageSelector />
      </div>
    );
  }
}
