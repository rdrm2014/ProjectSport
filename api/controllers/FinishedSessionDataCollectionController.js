/**
 * FinishedSessionDataCollectionController
 *
 * @description :: Server-side logic for managing Finishedsessiondatacollections
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {

      SessionConfigurationId: req.param('SessionConfigurationId'),

      ProcessedResults: req.param('ProcessedResults'),

      CollectedValues: req.param('CollectedValues'),

    }

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    FinishedSessionDataCollection.create(paramObj, function FinishedSessionDataCollectionCreated(err, FinishedSessionDataCollection) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/FinishedSessionDataCollection/new');
      }

      // res.json(FinishedSessionDataCollection);
      res.redirect('/FinishedSessionDataCollection/show/' + FinishedSessionDataCollection.id);

    });
  },

  show: function (req, res, next) {
    FinishedSessionDataCollection.findOne(req.param('id'), function foundFinishedSessionDataCollection(err, FinishedSessionDataCollection) {
      if (err) return next(err);
      if (!FinishedSessionDataCollection) return next();

      // res.json(FinishedSessionDataCollection);
      res.view({
        FinishedSessionDataCollection: FinishedSessionDataCollection
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    FinishedSessionDataCollection
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, FinishedSessionDataCollections) {
        if (err) return next(err);
        FinishedSessionDataCollection
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              FinishedSessionDataCollections: FinishedSessionDataCollections
            });
          });
      });
  },

  edit: function (req, res, next) {

    FinishedSessionDataCollection.findOne(req.param('id'), function foundFinishedSessionDataCollection(err, FinishedSessionDataCollection) {
      if (err) return next(err);
      if (!FinishedSessionDataCollection) return next('FinishedSessionDataCollection doesn\'t exist.');

      res.view({
        FinishedSessionDataCollection: FinishedSessionDataCollection
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {

      SessionConfigurationId: req.param('SessionConfigurationId'),

      ProcessedResults: req.param('ProcessedResults'),

      CollectedValues: req.param('CollectedValues'),

    }

    FinishedSessionDataCollection.update(req.param('id'), paramObj, function FinishedSessionDataCollectionUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/FinishedSessionDataCollection/edit/' + req.param('id'));
      }

      res.redirect('/FinishedSessionDataCollection/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    FinishedSessionDataCollection.findOne(req.param('id'), function foundFinishedSessionDataCollection(err, FinishedSessionDataCollection) {
      if (err) return next(err);

      if (!FinishedSessionDataCollection) return next('FinishedSessionDataCollection doesn\'t exist.');

      FinishedSessionDataCollection.destroy(req.param('id'), function FinishedSessionDataCollectionDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/FinishedSessionDataCollection');

    });
  }


};

