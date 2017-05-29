

module.exports.setupFunction = function ({config,messages,models},helper,middlewares,validator) {

  const updateCSVFile = async (req,res) => {
    try {
      let validated = await validator.validatePostUsers(req.inputs);
      if(validated.error)
        return helper.sendError(res,validated.error);
      let user = new models.User();
      user._id = helper.generateObjectId();
      user.firstName = req.inputs.firstName;
      user.lastName = req.inputs.lastName;
      await user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    } catch (ex){
      return helper.sendError(res,ex)
    }
  };

  module.exports.APIs = {

    updateCVSFile : {
      route : '/upload/csv',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [], //FIFO order of middleware
      handler : updateCSVFile
    },

  };

};