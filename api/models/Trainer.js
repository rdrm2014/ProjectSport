/**
* Trainer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    Name : { type: 'string' },

    Birthday : { type: 'date' },

    Email : { type: 'email' },

      //NEW

      Athlete: {
          collection: 'Athlete',
          via: 'Trainer',
          dominant: true
      }
  }
};

