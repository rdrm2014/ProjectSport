/**
 * BoardTrackSessionController
 *
 * @description :: Server-side logic for managing Boardtracksessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {

      TrackAthleteId: req.param('TrackAthleteId'),

      BoardSerialNumber: req.param('BoardSerialNumber'),

      BoardLocation: req.param('BoardLocation'),

      BoardDetailId: req.param('BoardDetailId'),

    }

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    BoardTrackSession.create(paramObj, function BoardTrackSessionCreated(err, BoardTrackSession) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/BoardTrackSession/new');
      }

      // res.json(BoardTrackSession);
      res.redirect('/BoardTrackSession/show/' + BoardTrackSession.id);

    });
  },

  show: function (req, res, next) {
    BoardTrackSession.findOne(req.param('id'), function foundBoardTrackSession(err, BoardTrackSession) {
      if (err) return next(err);
      if (!BoardTrackSession) return next();

      // res.json(BoardTrackSession);
      res.view({
        BoardTrackSession: BoardTrackSession
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    BoardTrackSession
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, BoardTrackSessions) {
        if (err) return next(err);
        BoardTrackSession
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              BoardTrackSessions: BoardTrackSessions
            });
          });
      });
  },

  edit: function (req, res, next) {

    BoardTrackSession.findOne(req.param('id'), function foundBoardTrackSession(err, BoardTrackSession) {
      if (err) return next(err);
      if (!BoardTrackSession) return next('BoardTrackSession doesn\'t exist.');

      res.view({
        BoardTrackSession: BoardTrackSession
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {

      TrackAthleteId: req.param('TrackAthleteId'),

      BoardSerialNumber: req.param('BoardSerialNumber'),

      BoardLocation: req.param('BoardLocation'),

      BoardDetailId: req.param('BoardDetailId'),

    }

    BoardTrackSession.update(req.param('id'), paramObj, function BoardTrackSessionUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/BoardTrackSession/edit/' + req.param('id'));
      }

      res.redirect('/BoardTrackSession/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    BoardTrackSession.findOne(req.param('id'), function foundBoardTrackSession(err, BoardTrackSession) {
      if (err) return next(err);

      if (!BoardTrackSession) return next('BoardTrackSession doesn\'t exist.');

      BoardTrackSession.destroy(req.param('id'), function BoardTrackSessionDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/BoardTrackSession');

    });
  }


};

