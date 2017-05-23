/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function ({mongoose}) {


  // This middleware gets Params and add them in req.inputs

  const getParams = (req, res, next) => {
    for(let prop in  req.params) {
      if(req.params.hasOwnProperty(prop))
        req.inputs[prop] = req.params[prop];
    }
    next();
  };

  const dummyRouteLevelMiddleware1 = (req, res, next) => {
    console.log('Hello');
    next();
  };

  const dummyRouteLevelMiddleware2 = (req, res, next) => {
    console.log('Hello2');
    next();
  };

  return {
    dummyRouteLevelMiddleware1,
    dummyRouteLevelMiddleware2,
    getParams
  }

};