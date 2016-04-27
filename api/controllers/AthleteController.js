/**
 * AthleteController
 *
 * @description :: Server-side logic for managing Athletes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    new: function (req, res) {
        res.view({
            user: req.user
        });
    },

    create: function (req, res) {
        var paramObj = {

            Name: req.param('Name'),
            Birthday: req.param('Birthday'),
            Email: req.param('Email'),
            flash: true
        };

        // Create a User with the params sent from
        // the sign-up form --> new.ejs
        Athlete.create(paramObj, function AthleteCreated(err, Athlete) {

            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                };
                return res.redirect('/Athlete/new');
            }

            // res.json(Athlete);
            res.redirect('/Athlete/show/' + Athlete.id);

        });
    },

    show: function (req, res, next) {
        Athlete.findOne(req.param('id'), function foundAthlete(err, Athlete) {
            if (err) return next(err);
            if (!Athlete) return next();

            // res.json(Athlete);
            res.view({
                Athlete: Athlete
            });
        });
    },

    index: function (req, res, next) {
        var paramObj = {
            pageParam: req.param('page') != null ? req.param('page') : 1,
            limitParam: req.param('limit') != null ? req.param('limit') : 10
        };

        Athlete
            .find()//{skip: 2, limit: 20})
            .paginate({page: paramObj.pageParam, limit: paramObj.limitParam})
            .exec(function (err, Athletes) {
                if (err) return next(err);
                Athlete
                    .count(function (err, numElements) {
                        res.view({
                            pageCount: numElements / paramObj.limitParam,
                            currentPage: paramObj.pageParam,
                            Athletes: Athletes
                        });
                    });
            });
    },

    edit: function (req, res, next) {
        Athlete.findOne(req.param('id'), function foundAthlete(err, Athlete) {
            if (err) return next(err);
            if (!Athlete) return next('Athlete doesn\'t exist.');

            res.view({
                Athlete: Athlete
            });
        });
    },

    update: function (req, res, next) {
        var moment = require('moment');

        var paramObj = {
            Name: req.param('Name'),
            Birthday: moment(req.param('Birthday'), "DD/MM/YYYY HH:mm"),
            Email: req.param('Email')
        };

        Athlete.update(req.param('id'), paramObj, function AthleteUpdated(err) {
            if (err) {
                console.log(err);

                req.session.flash = {
                    err: err
                };

                return res.redirect('/Athlete/edit/' + req.param('id'));
            }
            res.redirect('/Athlete/show/' + req.param('id'));
        });
    },

    destroy: function (req, res, next) {
        Athlete.findOne(req.param('id'), function foundAthlete(err, Athlete) {
            if (err) return next(err);

            if (!Athlete) return next('Athlete doesn\'t exist.');

            Athlete.destroy(req.param('id'), function AthleteDestroyed(err) {
                if (err) return next(err);
            });
            res.redirect('/Athlete');
        });
    }
};
