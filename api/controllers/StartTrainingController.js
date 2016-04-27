/**
 * StartTrainingController
 *
 * @description :: Server-side logic for managing StartTraining
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  new: function (req, res) {
    SessionType.find(function foundSessionTypes(err, SessionTypes) {
      if (err) return next(err);
      SportType.find(function foundSportTypes(err, SportTypes) {
        if (err) return next(err);
        BoardTrackSession.find(function foundSportTypes(err, BoardTrackSessions) {
          if (err) return next(err);
          Athlete.find(function foundSportTypes(err, Athletes) {
            if (err) return next(err);
            res.view({
              SportTypes: SportTypes, SessionTypes: SessionTypes, Boards: BoardTrackSessions, Athletes:Athletes
            });
          });
        });
      });
    });
  },

  create: function (req, res) {

    var paramObj = {
      SportType: req.param('SportType'),
      SessionType: req.param('SessionType'),
      Board: req.param('Board'),
      Athlete: req.param('Athlete')
    };

    console.log(JSON.stringify(paramObj));

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    /*Athlete.create(paramObj, function AthleteCreated(err, Athlete) {

     if (err) {
     console.log(err);
     req.session.flash = {
     err: err
     };
     return res.redirect('/Athlete/new');
     }

     // res.json(Athlete);
     res.redirect('/Athlete/show/' + Athlete.id);
     });*/
    res.redirect('/StartTraining/');
  },

  /*
   show: function (req, res, next) {
   Athlete.findOne(req.param('id'), function foundAthlete(err, Athlete) {
   if (err) return next(err);
   if (!Athlete) return next();

   // res.json(Athlete);
   res.view({
   Athlete: Athlete
   });
   });
   },
   */

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    SportType
      .find()
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, SportTypes) {
        if (err) return next(err);
        SportType
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              SportTypes: SportTypes
            });
          });
      });
  },

  listSTAthlets: function (req, res, next) {
    var paramObj = {
      nameAthleteParam: req.param('nameAthlete'),
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    Athlete
      .find({like: {name: '%' + paramObj.nameAthleteParam + '%'}}, {select: ['name']})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, Athletes) {
        if (err) return next(err);

        res.json(Athletes);
      });
  },

  listSTBoards: function (req, res, next) {
    var paramObj = {
      boardSerialNumberParam: req.param('boardSerialNumber'),
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    BoardTrackSession
      .find({like: {boardSerialNumber: '%' + paramObj.boardSerialNumberParam + '%'}}, {select: ['boardSerialNumber']})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, BoardTrackSessions) {
        if (err) return next(err);

        res.json(BoardTrackSessions);
      });
  }

  /*
   edit: function (req, res, next) {

   Athlete.findOne(req.param('id'), function foundAthlete(err, Athlete) {
   if (err) return next(err);
   if (!Athlete) return next('Athlete doesn\'t exist.');

   res.view({
   Athlete: Athlete
   });
   });
   },

   update: function (req, res, next) {

   var paramObj = {
   Name: req.param('Name'),
   Birthday: req.param('Birthday'),
   Email: req.param('Email')
   };

   Athlete.update(req.param('id'), paramObj, function AthleteUpdated(err) {
   if (err) {
   console.log(err);

   req.session.flash = {
   err: err
   };

   return res.redirect('/Athlete/edit/' + req.param('id'));
   }

   res.redirect('/Athlete/show/' + req.param('id'));
   });
   },

   destroy: function (req, res, next) {

   Athlete.findOne(req.param('id'), function foundAthlete(err, Athlete) {
   if (err) return next(err);

   if (!Athlete) return next('Athlete doesn\'t exist.');

   Athlete.destroy(req.param('id'), function AthleteDestroyed(err) {
   if (err) return next(err);
   });
   res.redirect('/Athlete');
   });
   }
   */
};

