/**
 * BoardDetailController
 *
 * @description :: Server-side logic for managing Boarddetails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {
      ManufacturedDate: req.param('ManufacturedDate'),
      SoftwareVersion: req.param('SoftwareVersion')
    };

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    BoardDetail.create(paramObj, function BoardDetailCreated(err, BoardDetail) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/BoardDetail/new');
      }

      // res.json(BoardDetail);
      res.redirect('/BoardDetail/show/' + BoardDetail.id);
    });
  },

  show: function (req, res, next) {
    BoardDetail.findOne(req.param('id'), function foundBoardDetail(err, BoardDetail) {
      if (err) return next(err);
      if (!BoardDetail) return next();

      // res.json(BoardDetail);
      res.view({
        BoardDetail: BoardDetail
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    BoardDetail
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, BoardDetails) {
        if (err) return next(err);
        BoardDetail
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              BoardDetails: BoardDetails
            });
          });
      });
  },

  edit: function (req, res, next) {

    BoardDetail.findOne(req.param('id'), function foundBoardDetail(err, BoardDetail) {
      if (err) return next(err);
      if (!BoardDetail) return next('BoardDetail doesn\'t exist.');

      res.view({
        BoardDetail: BoardDetail
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {
      ManufacturedDate: req.param('ManufacturedDate'),
      SoftwareVersion: req.param('SoftwareVersion')
    };

    BoardDetail.update(req.param('id'), paramObj, function BoardDetailUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        };

        return res.redirect('/BoardDetail/edit/' + req.param('id'));
      }

      res.redirect('/BoardDetail/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    BoardDetail.findOne(req.param('id'), function foundBoardDetail(err, BoardDetail) {
      if (err) return next(err);

      if (!BoardDetail) return next('BoardDetail doesn\'t exist.');

      BoardDetail.destroy(req.param('id'), function BoardDetailDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/BoardDetail');
    });
  }
};
