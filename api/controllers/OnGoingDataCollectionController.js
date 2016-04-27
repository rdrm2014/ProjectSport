/**
 * OnGoingDataCollectionController
 *
 * @description :: Server-side logic for managing Ongoingdatacollections
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {
      TrackSessionConfigurationId: req.param('TrackSessionConfigurationId'),
      InformationTypeId: req.param('InformationTypeId'),
      DataCollectionTime: req.param('DataCollectionTime'),
      DataCollectionValue: req.param('DataCollectionValue'),
      sensorN: req.param('sensorN')
    };

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    OnGoingDataCollection.create(paramObj, function OnGoingDataCollectionCreated(err, OnGoingDataCollection) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/OnGoingDataCollection/new');
      }

      // res.json(OnGoingDataCollection);
      res.redirect('/OnGoingDataCollection/show/' + OnGoingDataCollection.id);

    });
  },

  show: function (req, res, next) {
    OnGoingDataCollection.findOne(req.param('id'), function foundOnGoingDataCollection(err, OnGoingDataCollection) {
      if (err) return next(err);
      if (!OnGoingDataCollection) return next();

      // res.json(OnGoingDataCollection);
      res.view({
        OnGoingDataCollection: OnGoingDataCollection
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    OnGoingDataCollection
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, OnGoingDataCollections) {
        if (err) return next(err);
        OnGoingDataCollection
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements/paramObj.limitParam,
              currentPage: paramObj.pageParam,
              OnGoingDataCollections: OnGoingDataCollections
            });
          });
      });
  },

  edit: function (req, res, next) {
    OnGoingDataCollection.findOne(req.param('id'), function foundOnGoingDataCollection(err, OnGoingDataCollection) {
      if (err) return next(err);
      if (!OnGoingDataCollection) return next('OnGoingDataCollection doesn\'t exist.');
      res.view({
        OnGoingDataCollection: OnGoingDataCollection, user: req.user
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {
      TrackSessionConfigurationId: req.param('TrackSessionConfigurationId'),
      InformationTypeId: req.param('InformationTypeId'),
      DataCollectionTime: req.param('DataCollectionTime'),
      DataCollectionValue: req.param('DataCollectionValue'),
      sensorN: req.param('sensorN')
    };

    OnGoingDataCollection.update(req.param('id'), paramObj, function OnGoingDataCollectionUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        };

        return res.redirect('/OnGoingDataCollection/edit/' + req.param('id'));
      }

      res.redirect('/OnGoingDataCollection/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    OnGoingDataCollection.findOne(req.param('id'), function foundOnGoingDataCollection(err, OnGoingDataCollection) {
      if (err) return next(err);

      if (!OnGoingDataCollection) return next('OnGoingDataCollection doesn\'t exist.');

      OnGoingDataCollection.destroy(req.param('id'), function OnGoingDataCollectionDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/onGoingDataCollection');

    });
  }


};

