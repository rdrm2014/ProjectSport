/**
* BoardDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    ManufacturedDate : { type: 'date' },

    SoftwareVersion : { type: 'string' },

      //NEW
      BoardTrackSession: {
          collection: 'BoardTrackSession',
          via: 'BoardDetailId'
      }
  }
};

