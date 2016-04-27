/**
 * SessionTypeController
 *
 * @description :: Server-side logic for managing Sessiontypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {

      Name: req.param('Name'),

      Description: req.param('Description'),

    }

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    SessionType.create(paramObj, function SessionTypeCreated(err, SessionType) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/SessionType/new');
      }

      // res.json(SessionType);
      res.redirect('/SessionType/show/' + SessionType.id);

    });
  },

  show: function (req, res, next) {
    SessionType.findOne(req.param('id'), function foundSessionType(err, SessionType) {
      if (err) return next(err);
      if (!SessionType) return next();

      // res.json(SessionType);
      res.view({
        SessionType: SessionType
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    SessionType
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, SessionTypes) {
        if (err) return next(err);
        SessionType
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              SessionTypes: SessionTypes
            });
          });
      });
  },

  edit: function (req, res, next) {

    SessionType.findOne(req.param('id'), function foundSessionType(err, SessionType) {
      if (err) return next(err);
      if (!SessionType) return next('SessionType doesn\'t exist.');

      res.view({
        SessionType: SessionType
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {

      Name: req.param('Name'),

      Description: req.param('Description'),

    }

    SessionType.update(req.param('id'), paramObj, function SessionTypeUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/SessionType/edit/' + req.param('id'));
      }

      res.redirect('/SessionType/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    SessionType.findOne(req.param('id'), function foundSessionType(err, SessionType) {
      if (err) return next(err);

      if (!SessionType) return next('SessionType doesn\'t exist.');

      SessionType.destroy(req.param('id'), function SessionTypeDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/SessionType');

    });
  }


};

