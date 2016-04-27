/**
* OnGoingDataCollection.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    //TrackSessionConfigurationId : { type: 'integer' },

    DataCollectionTime : { type: 'string' },

    DataCollectionValue : { type: 'string' },
    sensorN : { type: 'integer' },

    InformationTypeId: {
      model: 'InformationType'
    },

      //NEW

      TrackSessionConfigurationId: {
          model: 'TrackSessionConfiguration'
      }
  }
};

