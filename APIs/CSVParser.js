

module.exports.setupFunction = function ({config,messages,csv,models},helper,middlewares,validator) {

  const updateCSVFile = async (req,res) => {
    try {
      // let validated = await validator.validatePostUsers(req.inputs);
      // if(validated.error)
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
          return res.redirect('/result/'+csvData._id);
        });
    } catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const sendIndexFile = async (req,res) => {
    return res.render('pages/index.ejs');
  };

  const result = async (req,res) =>{
    try {
      console.log('result Id',req.inputs.resultId);
      let csvFile = await models.CSV.findOne({_id : req.inputs.resultId});
      if(!csvFile)
        return helper.sendResponse(res,messages.DATA_NOT_FOUND);
      return res.render('pages/result.ejs',{data: JSON.stringify(csvFile)});
    }catch(ex){
      return helper.sendError(res,ex)
    }
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
    admin : {
      route : '/result/:resultId',
      method : 'GET',
      prefix : config.API_PREFIX.NO_PREFIX,
      middlewares : [middlewares.getParams], //FIFO order of middleware
      handler : result
    },

  };

};