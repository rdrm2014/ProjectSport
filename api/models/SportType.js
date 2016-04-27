/**
* SportType.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    Name : { type: 'string' },

    Description : { type: 'string' },

      //NEW

      TrackAthlete: {
          collection: 'TrackAthlete',
          via: 'SportTypeId'
      }
  }
};

