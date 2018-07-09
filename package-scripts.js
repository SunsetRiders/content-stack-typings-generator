const utils = require('nps-utils');

module.exports = {
  scripts: {
    'clear': {
      'default': utils.rimraf('./lib')
    },

    'build': {
      'typescript': 'tsc -p .',
      'default': 'nps clear build.typescript'
    }
  }
};
