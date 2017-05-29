/**
 * Created by Rohail Najam on 2/5/2017.
 */

const path = require('path');
const rootPath = path.normalize(__dirname+"/../");


const configurations = {

  development : {
    port : process.env.PORT,
    rootPath : rootPath,
    db: {
      name : "GraphForest"
    },
    logStyle : 'dev',
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth',
      NO_PREFIX : ''
    }
  },

  production : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    logStyle : 'combined',
    db: {
      name : "GraphForest"
    },
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth',
      NO_PREFIX : ''
    }
  },

  testing : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    logStyle : 'combined',
    db: {
      name : "GraphForest"
    },
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth',
      NO_PREFIX : ''
    }
  }
};


function returnConfiguration(env) {
  return configurations[env];
}

module.exports = returnConfiguration;