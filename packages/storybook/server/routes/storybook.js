'use strict';

var storybook = require('../controllers/storybook');

// The Package is past automatically as first parameter
module.exports = function(Storybook, app, auth, database) {

    app.get('/storybook/view/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this view!');
    });

    app.get('/storybook/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/storybook/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/storybook/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/storybook/example/render', function(req, res, next) {
        Storybook.render('index', {
            package: 'storybook'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    //custom routes
    app.route('/writeBook')
      .post(storybook.writeBook);

    app.route('/listBooks')
      .post(storybook.listBooks);

    app.route('/viewBook')
      .post(storybook.viewBook);

    app.route('/findBook')
      .post(storybook.findBook);

    app.route('/editBook')
      .post(storybook.editBook);
};
