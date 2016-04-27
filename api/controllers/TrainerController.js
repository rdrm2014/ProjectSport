/**
 * TrainerController
 *
 * @description :: Server-side logic for managing Trainers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res) {

    var paramObj = {
      Name: req.param('Name'),
      Birthday: req.param('Birthday'),
      Email: req.param('Email')
    };

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    Trainer.create(paramObj, function TrainerCreated(err, Trainer) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/Trainer/new');
      }

      // res.json(Trainer);
      res.redirect('/Trainer/show/' + Trainer.id);

    });
  },

  show: function (req, res, next) {
    Trainer.findOne(req.param('id'), function foundTrainer(err, Trainer) {
      if (err) return next(err);
      if (!Trainer) return next();

      // res.json(Trainer);
      res.view({
        Trainer: Trainer
      });
    });
  },

  index: function (req, res, next) {
    var paramObj = {
      pageParam: req.param('page') != null ? req.param('page') : 1,
      limitParam: req.param('limit') != null ? req.param('limit') : 10
    };

    Trainer
      .find()//{skip: 2, limit: 20})
      .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
      .exec(function (err, Trainers) {
        if (err) return next(err);
        Trainer
          .count(function (err, numElements) {
            res.view({
              pageCount: numElements / paramObj.limitParam,
              currentPage: paramObj.pageParam,
              Trainers: Trainers
            });
          });
      });
  },

  edit: function (req, res, next) {

    Trainer.findOne(req.param('id'), function foundTrainer(err, Trainer) {
      if (err) return next(err);
      if (!Trainer) return next('Trainer doesn\'t exist.');

      res.view({
        Trainer: Trainer
      });
    });
  },

  update: function (req, res, next) {

    var paramObj = {
      Name: req.param('Name'),
      Birthday: req.param('Birthday'),
      Email: req.param('Email')
    };

    Trainer.update(req.param('id'), paramObj, function TrainerUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        };

        return res.redirect('/Trainer/edit/' + req.param('id'));
      }

      res.redirect('/Trainer/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    Trainer.findOne(req.param('id'), function foundTrainer(err, Trainer) {
      if (err) return next(err);

      if (!Trainer) return next('Trainer doesn\'t exist.');

      Trainer.destroy(req.param('id'), function TrainerDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/Trainer');

    });
  }
};

