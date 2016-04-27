/**
* BoardTrackSession.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    //TrackAthleteId : { type: 'integer' },

    BoardSerialNumber : { type: 'integer' },

    BoardLocation : { type: 'string' },

    //BoardDetailId : { type: 'integer' }

      //NEW
      TrackAthleteId: {
          model: 'TrackAthlete'
      },

      TrackSessionConfiguration: {
          collection: 'TrackSessionConfiguration',
          via: 'BoardTrackSessionId'
      },
      BoardDetailId: {
          model: 'BoardDetail'
      }

  }
};

