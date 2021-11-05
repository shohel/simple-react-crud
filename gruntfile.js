'use strict';
module.exports = function ( grunt ) {

    var sass = require('node-sass');

    /*
     * Grunt Tasks
     * load all grunt tasks matching the `grunt-*` pattern
     * Ref. https://npmjs.org/package/load-grunt-tasks
     */
    require( 'load-grunt-tasks' )( grunt );

    /*
     * Grunt Config
     */
    grunt.initConfig( {
        // watch for changes and trigger sass, uglify and livereload
        watch: {
            sass: {
                files: [ 'assets/css/scss/**/*.{scss,sass}' ],
                tasks: [ 'sass' ],
            }
        },
        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    implementation: sass,
                    //sourcemap: 'none'
                },

                files: {
                    'assets/css/style.css': 'assets/css/scss/entry.scss'
                }
            }
        },

    } );

    grunt.registerTask( 'default', [ 'sass' ] );

};
