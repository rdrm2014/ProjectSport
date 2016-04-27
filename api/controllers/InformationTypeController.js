/**
 * InformationTypeController
 *
 * @description :: Server-side logic for managing Informationtypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {

      Name: req.param('Name'),
      Description: req.param('Description')
    };

    console.log(paramObj);
    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    InformationType.create(paramObj, function InformationTypeCreated(err, InformationType) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/InformationType/new');
      }

      // res.json(InformationType);
      res.redirect('/InformationType/show/' + InformationType.id);

    });
  },

  show: function (req, res, next) {
    InformationType.findOne(req.param('id'), function foundInformationType(err, InformationType) {
      if (err) return next(err);
      if (!InformationType) return next();

      // res.json(InformationType);
      res.view({
        InformationType: InformationType
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    InformationType
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, InformationTypes) {
        if (err) return next(err);
        InformationType
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              InformationTypes: InformationTypes
            });
          });
      });
  },

  edit: function (req, res, next) {

    InformationType.findOne(req.param('id'), function foundInformationType(err, InformationType) {
      if (err) return next(err);
      if (!InformationType) return next('InformationType doesn\'t exist.');

      res.view({
        InformationType: InformationType
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {

      Name: req.param('Name'),

      Description: req.param('Description')

    }

    InformationType.update(req.param('id'), paramObj, function InformationTypeUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/InformationType/edit/' + req.param('id'));
      }

      res.redirect('/InformationType/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    InformationType.findOne(req.param('id'), function foundInformationType(err, InformationType) {
      if (err) return next(err);

      if (!InformationType) return next('InformationType doesn\'t exist.');

      InformationType.destroy(req.param('id'), function InformationTypeDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/InformationType');

    });
  }


};

