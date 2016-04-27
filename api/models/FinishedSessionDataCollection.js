/**
* FinishedSessionDataCollection.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    //SessionConfigurationId : { type: 'integer' },

    ProcessedResults : { type: 'string' },

    CollectedValues : { type: 'string' },

      //NEW
      TrackSessionConfigurationId: {
          model: 'TrackSessionConfiguration'
      }
  }
};

