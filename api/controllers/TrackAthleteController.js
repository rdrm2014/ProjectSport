/**
 * TrackAthleteController
 *
 * @description :: Server-side logic for managing Trackathletes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {
      SessionId: req.param('SessionId'),
      StartTime: req.param('StartTime'),
      EndTime: req.param('EndTime'),
      SessionTypeId: req.param('SessionTypeId'),
      SportTypeId: req.param('SportTypeId'),
      AthleteId: req.param('AthleteId')
    };

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    TrackAthlete.create(paramObj, function TrackAthleteCreated(err, TrackAthlete) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/TrackAthlete/new');
      }

      // res.json(TrackAthlete);
      res.redirect('/TrackAthlete/show/' + TrackAthlete.id);

    });
  },

  show: function (req, res, next) {
    TrackAthlete.findOne(req.param('id'), function foundTrackAthlete(err, TrackAthlete) {
      if (err) return next(err);
      if (!TrackAthlete) return next();

      // res.json(TrackAthlete);
      res.view({
        TrackAthlete: TrackAthlete
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    TrackAthlete
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, TrackAthletes) {
        if (err) return next(err);
        TrackAthlete
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              TrackAthletes: TrackAthletes
            });
          });
      });
  },

  edit: function (req, res, next) {

    TrackAthlete.findOne(req.param('id'), function foundTrackAthlete(err, TrackAthlete) {
      if (err) return next(err);
      if (!TrackAthlete) return next('TrackAthlete doesn\'t exist.');

      res.view({
        TrackAthlete: TrackAthlete
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {
      SessionId: req.param('SessionId'),
      StartTime: req.param('StartTime'),
      EndTime: req.param('EndTime'),
      SessionTypeId: req.param('SessionTypeId'),
      SportTypeId: req.param('SportTypeId'),
      AthleteId: req.param('AthleteId')
    };

    TrackAthlete.update(req.param('id'), paramObj, function TrackAthleteUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        };

        return res.redirect('/TrackAthlete/edit/' + req.param('id'));
      }

      res.redirect('/TrackAthlete/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    TrackAthlete.findOne(req.param('id'), function foundTrackAthlete(err, TrackAthlete) {
      if (err) return next(err);

      if (!TrackAthlete) return next('TrackAthlete doesn\'t exist.');

      TrackAthlete.destroy(req.param('id'), function TrackAthleteDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/TrackAthlete');
    });
  }
};

