/**
 * TrackSessionConfigurationController
 *
 * @description :: Server-side logic for managing Tracksessionconfigurations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {
      BoardTrackSessionId: req.param('BoardTrackSessionId'),
      BoardLocation: req.param('BoardLocation')
    };

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    TrackSessionConfiguration.create(paramObj, function TrackSessionConfigurationCreated(err, TrackSessionConfiguration) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/TrackSessionConfiguration/new');
      }

      // res.json(TrackSessionConfiguration);
      res.redirect('/TrackSessionConfiguration/show/' + TrackSessionConfiguration.id);

    });
  },

  show: function (req, res, next) {
    TrackSessionConfiguration.findOne(req.param('id'), function foundTrackSessionConfiguration(err, TrackSessionConfiguration) {
      if (err) return next(err);
      if (!TrackSessionConfiguration) return next();

      // res.json(TrackSessionConfiguration);
      res.view({
        TrackSessionConfiguration: TrackSessionConfiguration
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    TrackSessionConfiguration
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, TrackSessionConfigurations) {
        if (err) return next(err);
        TrackSessionConfiguration
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              TrackSessionConfigurations: TrackSessionConfigurations
            });
          });
      });
  },

  edit: function (req, res, next) {

    TrackSessionConfiguration.findOne(req.param('id'), function foundTrackSessionConfiguration(err, TrackSessionConfiguration) {
      if (err) return next(err);
      if (!TrackSessionConfiguration) return next('TrackSessionConfiguration doesn\'t exist.');

      res.view({
        TrackSessionConfiguration: TrackSessionConfiguration
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {
      BoardTrackSessionId: req.param('BoardTrackSessionId'),
      BoardLocation: req.param('BoardLocation')
    };

    TrackSessionConfiguration.update(req.param('id'), paramObj, function TrackSessionConfigurationUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        };

        return res.redirect('/TrackSessionConfiguration/edit/' + req.param('id'));
      }

      res.redirect('/TrackSessionConfiguration/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    TrackSessionConfiguration.findOne(req.param('id'), function foundTrackSessionConfiguration(err, TrackSessionConfiguration) {
      if (err) return next(err);

      if (!TrackSessionConfiguration) return next('TrackSessionConfiguration doesn\'t exist.');

      TrackSessionConfiguration.destroy(req.param('id'), function TrackSessionConfigurationDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/TrackSessionConfiguration');

    });
  }

};

