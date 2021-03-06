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
    color: '#555',
  },
  a: {
    textDecoration: 'none',
    color: '#444',
    cursor: 'pointer',
  },
  'a:hover': {
    color: '#000',
  },
};
