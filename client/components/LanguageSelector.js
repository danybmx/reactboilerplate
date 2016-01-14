// Dependencies
import React, { Component } from 'react';
import Radium from 'radium';
import color from 'color';

// Style variables
import v from '../styles/variables';

const styles = {
  languageSelector: {
    float: 'right',
    position: 'relative',
    marginTop: 3,
  },
  languageSelectorButton: {
    display: 'inline-block',
    color: '#FFF',
    padding: '6px 10px 4px',
    ':hover': {
      backgroundColor: 'white',
      color: v.mainColor,
      boxShadow: v.shadow,
    },
  },
  languageSelectorButtonOpen: {
    backgroundColor: color(v.mainColor).darken(0.1).hexString(),
    color: 'white',
  },
  languageList: {
    top: 33,
    right: 0,
    position: 'absolute',
    backgroundColor: 'white',
    color: v.mainColor,
    boxShadow: v.shadow,
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    minWidth: '100%',
  },
  languageListItem: {
    display: 'block',
    padding: '4px 10px',
    textAlign: 'right',
    ':hover': {
      backgroundColor: v.secondaryColor,
      color: 'white',
    },
  },
  hidden: {
    display: 'none',
  },
};

@Radium
export default class LanguageSelector extends Component {
  handleClick() {
    this.setState({ selectLanguage: !!!this.state.selectLanguage });
  }

  render() {
    return (
      <div style={styles.languageSelector}>
        <a
          style={[
            styles.languageSelectorButton,
            this.state.selectLanguage ? styles.languageSelectorButtonOpen : {},
          ]}
          onClick={this.handleClick.bind(this, 'languageSelectorButton')}>
          Español <i className="fa fa-angle-down"></i>
        </a>
        <ul style={ [this.state.selectLanguage ? styles.languageList : styles.hidden] }>
          <li><a ref="es" style={styles.languageListItem}>Español</a></li>
          <li><a ref="ga" style={styles.languageListItem}>Galego</a></li>
          <li><a ref="en" style={styles.languageListItem}>English</a></li>
        </ul>
      </div>
    );
  }
}
