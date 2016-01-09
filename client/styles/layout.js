import variables from './variables';

export default {
  '*': {
    fontFamily: variables.font.family,
    fontSize: variables.font.size,
  },
  html: {
    minHeight: '100%',
  },
  body: {
    margin: 0,
    minHeight: '100%',
  },
};
