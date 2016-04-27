/**
 * DefaultController
 *
 * @description :: Server-side logic for managing Default
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  homepage: function (req, res, next) {
    console.log(req.user);
    res.view({
      title: "SportProject",
      user: req.user
    });
  }
};

