'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Stripepayment = new Module('stripepayment');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Stripepayment.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Stripepayment.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    // Stripepayment.menus.add({
    //     title: 'My Payments',
    //     link: 'stripepayment example page',
    //     roles: ['authenticated'],
    //     menu: 'main'
    // });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Stripepayment.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Stripepayment.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Stripepayment.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Stripepayment;
});
