/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    data : {
      type : Schema.Types.Mixed
    }
  },{
    timeStamp : true
  });

};