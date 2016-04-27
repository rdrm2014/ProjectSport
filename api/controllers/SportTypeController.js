/**
 * SportTypeController
 *
 * @description :: Server-side logic for managing Sporttypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  new: function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {
      Name: req.param('Name'),
      Description: req.param('Description')
    };

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    SportType.create(paramObj, function SportTypeCreated(err, SportType) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/SportType/new');
      }

      // res.json(SportType);
      res.redirect('/SportType/show/' + SportType.id);

    });
  },

  show: function (req, res, next) {
    SportType.findOne(req.param('id'), function foundSportType(err, SportType) {
      if (err) return next(err);
      if (!SportType) return next();

      // res.json(SportType);
      res.view({
        SportType: SportType
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    SportType
      .find()//{skip: 2, limit: 20})
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

  edit: function (req, res, next) {

    SportType.findOne(req.param('id'), function foundSportType(err, SportType) {
      if (err) return next(err);
      if (!SportType) return next('SportType doesn\'t exist.');

      res.view({
        SportType: SportType
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {

      Name: req.param('Name'),

      Description: req.param('Description'),

    }

    SportType.update(req.param('id'), paramObj, function SportTypeUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/SportType/edit/' + req.param('id'));
      }

      res.redirect('/SportType/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    SportType.findOne(req.param('id'), function foundSportType(err, SportType) {
      if (err) return next(err);

      if (!SportType) return next('SportType doesn\'t exist.');

      SportType.destroy(req.param('id'), function SportTypeDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/SportType');

    });
  }


};

