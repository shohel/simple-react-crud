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
            },
            build: {
                files: '<%= concat.dist.src %>',
                tasks: [ 'concat' ]
            },
            js: {
                files: '<%= uglify.extra_config.src %>',
                tasks: [ 'uglify' ]
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
        // autoprefixer
        autoprefixer: {
            options: {
                browsers: [ 'last 2 versions', 'ie 9', 'ios 6', 'android 4' ],
                map: false,
            },
            files: {
                expand: true,
                flatten: true,
                src: 'assets/css/*.css',
                dest: 'assets/css/'
            }
        },
        /*
         * RTL CSS
         * Grunt plugin for RTLCSS, a framework for transforming CSS from LTR to RTL.
         * Ref. https://www.npmjs.com/package/grunt-rtlcss
         */
        rtlcss: {
            rtlCssTask: {
                // task options
                options: {
                    // generate source maps
                    map: false,
                    // rtlcss options
                    opts: {
                        clean: false
                    },
                    // rtlcss plugins
                    plugins: [ ],
                    // save unmodified files
                    saveUnmodified: true
                },
                expand: true,
                cwd: 'assets/css/',
                src: [ '*.css'],
                dest: 'assets/css-rtl/'
                //ext: '.rtl.css'
            }
        },
        /*
         * CSS minify
         * Compress and Minify CSS files
         * Ref. https://github.com/gruntjs/grunt-contrib-cssmin
         */
        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: [ '*.css', '!*.min.css'],
                dest: 'assets/css/',
                ext: '.min.css'
            }
        },

        /**
         * Concat JS file into one built file.
         *
         */

        concat: {
            options: {
                separator: ';',
                sourceMap : true,
            },
            dist: {
                src: [
                    'assets/js/src/*.js', '!**/*.min.js'
                ],
                dest: 'assets/js/main.js',
            },
        },

        /*
         * Uglify
         * Compress and Minify JS files
         * Ref. https://npmjs.org/package/grunt-contrib-uglify
         */
        uglify: {
            options: {
                banner: '/*! \n * Min JavaScript Library \n */'
            },
            extra_config: {
                extDot: 'last',
                expand: true,
                ext: '.min.js',

                src: [
                    'assets/js/**/*.js', '!**/*.min.js'
                ],
                dest: ''
            }
        },
        /*
          * Check text domain
          * Check your code for missing or incorrect text-domain in gettext functions
          * Ref. https://github.com/stephenharris/grunt-checktextdomain
          */
        checktextdomain: {
            options: {
                text_domain: ['reactjs-data-list'], //Specify allowed domain(s)
                keywords: [ //List keyword specifications
                    '__:1,2d',
                    '_e:1,2d',
                    '_x:1,2c,3d',
                    'esc_html__:1,2d',
                    'esc_html_e:1,2d',
                    'esc_html_x:1,2c,3d',
                    'esc_attr__:1,2d',
                    'esc_attr_e:1,2d',
                    'esc_attr_x:1,2c,3d',
                    '_ex:1,2c,3d',
                    '_n:1,2,4d',
                    '_nx:1,2,4c,5d',
                    '_n_noop:1,2,3d',
                    '_nx_noop:1,2,3c,4d'
                ]
            },
            target: {
                files: [ {
                    src: [
                        '*.php',
                        '**/*.php',
                        '!node_modules/**',
                        '!vendor/**',
                        '!inc/admin/framework/**',
                        '!tests/**'
                    ], //all php
                    expand: true
                } ]
            }
        },
        /*
         * Makepot
         * Generate a POT file for translators to use when translating your plugin or theme.
         * Ref. https://github.com/cedaro/grunt-wp-i18n/blob/develop/docs/makepot.md
         */
        makepot: {
            target: {
                options: {
                    cwd: '.', // Directory of files to internationalize.
                    domainPath: 'languages/', // Where to save the POT file.
                    exclude: [ 'node_modules/*'], // List of files or directories to ignore.
                    mainFile: 'reactjs-data-list.php', // Main project file.
                    potFilename: 'reactjs-data-list.pot', // Name of the POT file.
                    potHeaders: { // Headers to add to the generated POT file.
                        poedit: true, // Includes common Poedit headers.
                        //'Last-Translator': 'MakePot',
                        //'Language-Team': 'MakePot',
                        'report-msgid-bugs-to': '',
                        'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
                    },
                    type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
                    updateTimestamp: true, // Whether the POT-Creation-Date should be updated without other changes.
                    updatePoFiles: false // Whether to update PO files in the same directory as the POT file.
                }
            }
        },
        clean: {
            all: [ 'reactjs-data-list/' ]
        },
        copy: {
            files: {
                files: [
                    {
                        cwd: '.',
                        dest: 'reactjs-data-list/',
                        dot: true,
                        expand: true,
                        src: ['**', '!**/.{git,sass-cache,gitignore,travis.yml}/**', '!**/bin/**',  '!**/node_modules/**', '!**/src/**', '!**/tests/**', '!**/assets/css/scss/**', '!**/*.css.map', '!**/*.js.map', '!composer.json', '!composer.lock', '!package.json', '!package-lock.json', '!phpunit.xml.dist', '!phpcs.xml.dist', '!reactjs-data-list.zip','!gruntfile.js']
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'reactjs-data-list.zip'
                },
                files: [{
                    src: 'reactjs-data-list/' + '**',
                    dest: '.'
                }]
            }
        },

    } );

    grunt.registerTask( 'default', [ 'sass', 'concat', 'uglify', 'autoprefixer', 'cssmin', 'rtlcss', 'checktextdomain', 'makepot' ] );
    grunt.registerTask( 'build',   [ 'clean:all', 'copy:files', 'compress', 'clean:all' ] );
    grunt.registerTask( 'release', [ 'default', 'build' ] );
};
