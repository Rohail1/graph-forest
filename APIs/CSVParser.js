

module.exports.setupFunction = function ({config,messages,csv,models},helper,middlewares,validator) {

  const updateCSVFile = async (req,res) => {
    try {
      // let validated = await validator.validatePostUsers(req.inputs);
      // if(validated.error)
      console.log('req',req.body);
      console.log('req',req.file);
      if(!req.file)
        return helper.sendResponse(res,messages.BAD_REQUEST);
      let data = [];
      csv()
        .fromFile(req.file.path)
        .on('json',(jsonObj)=>{
          data.push(jsonObj);
        })
        .on('done',async (error)=>{
          let csvData = new models.CSV();
          csvData._id = helper.generateObjectId();
          csvData.name = req.file.originalname;
          csvData.data = data;
          await csvData.save();
          return helper.sendResponse(res,messages.SUCCESSFUL,data);
        });
    } catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const sendIndexFile = async (req,res) => {
    console.log('ok');
    return res.render('pages/index.ejs');
  };

  module.exports.APIs = {

    updateCVSFile : {
      route : '/uploads',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.uploadImageMiddleware.single('mediaFile')], //FIFO order of middleware
      handler : updateCSVFile
    },
    sendIndexFile : {
      route : '/',
      method : 'GET',
      prefix : config.API_PREFIX.NO_PREFIX,
      middlewares : [], //FIFO order of middleware
      handler : sendIndexFile
    },

  };

};