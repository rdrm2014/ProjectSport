/**
* TrackSessionConfiguration.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    //SensorInformationTypeId : { type: 'integer' },

    //BoardTrackSessionId : { type: 'integer' },

    BoardLocation : { type: 'String' },

         //NEW


      BoardTrackSessionId: {
          model: 'BoardTrackSession'
      },

      FinishedSessionDataCollection: {
          collection: 'FinishedSessionDataCollection',
          via: 'TrackSessionConfigurationId'
      },

      OnGoingDataCollection: {
          collection: 'OnGoingDataCollection',
          via: 'TrackSessionConfigurationId'
      }
  }
};

