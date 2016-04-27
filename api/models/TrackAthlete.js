/**
* TrackAthlete.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    SessionId : { type: 'integer' },

    StartTime : { type: 'datetime' },

    EndTime : { type: 'datetime' },

    //SessionTypeId : { type: 'integer' },

    //SportTypeId : { type: 'integer' },

    //AthleteId : { type: 'integer' }

      //NEW

      SessionTypeId: {
          model: 'SessionType'
      },

      SportTypeId: {
          model: 'SportType'
      },

      AthleteId: {
          model: 'Athlete'
      },

      BoardTrackSession: {
          collection: 'BoardTrackSession',
          via: 'TrackAthleteId'
      }
  }
};

