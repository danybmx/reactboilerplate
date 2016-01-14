import variables from './variables';

export default {
  '*': {
    fontFamily: variables.font.family,
    fontSize: variables.font.size,
    boxSizing: 'border-box',
  },
  html: {
    minHeight: '100%',
  },
  body: {
    margin: 0,
    minHeight: '100%',
  },
  a: {
    textDecoration: 'none',
    color: '#000000',
  },
  'a:hover': {
    textDecoration: 'underline',
    color: variables.warningColor,
  },
};
