'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Storybook = new Module('storybook');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Storybook.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Storybook.routes(app, auth, database);

    Storybook.aggregateAsset('css','storybook.css');

    //We are adding a link to the main menu for all authenticated users
    Storybook.menus.add({
        title: 'Storybooks',
        link: 'list',
        roles: ['anonymous', 'authenticated'],
        menu: 'main'
    });

    Storybook.menus.add({
        title: 'Write Storybook',
        link: 'write',
        roles: ['admin'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Storybook.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Storybook.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Storybook.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Storybook;
});
