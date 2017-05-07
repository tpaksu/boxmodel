module.exports = function( grunt ) {
    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                src: [ 'js/boxmodel.js' ],
                dest: 'build/js/boxmodel.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/boxmodel.min.css': 'css/boxmodel.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: [ 'js/boxmodel.js' ],
                tasks: [ 'uglify', 'jsObfuscate' ]
            },
            styles: {
                files: [ 'css/boxmodel.scss' ],
                tasks: 'sass'
            },
            docs: {
                files: [ 'documentation.md','docs/includes/template.html' ],
                tasks: 'markdown'
            }
        },
        markdown: {
            all: {
                files: [ {
                    expand: true,
                    src: ['documentation.md'],
                    dest: 'docs/',
                    ext: '.html'
                } ],
                options: {
                    template: 'docs/includes/template.html',
                    autoTemplate: true,
                    autoTemplateFormat: 'html'
                }
            }
        },
        jsObfuscate: {
            default: {
                files: {
                    'build/js/boxmodel.obf.js': 'build/js/boxmodel.min.js'
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'output/boxmodel.zip'
                },
                files: [ {
                    src: [ 'css/**' ],
                    dest: '/',
                }, {
                    src: [ 'build/**' ],
                    dest: '/'
                }, {
                    src: [ 'js/**' ],
                    dest: '/'
                }, {
                    src: [ 'docs/**' ],
                    dest: '/'
                }, {
                    src: [ 'gruntfile.js', '.gitignore', '.jshintrc', 'package.json', 'documentation.md', 'CHANGELOG' ],
                    dest: '/'
                }, ]
            },
            screenshots: {
                options: {
                    archive: 'output/screenshots.zip'
                },
                files: [ {
                    expand: true,
                    cwd: 'toolbox/screenshots/',
                    src: [ '*.png', '!inline.png', '!thumbnail.png' ],
                    dest: '/'
                } ]
            },
        },
        copy: {
            main: {
                expand: true,
                cwd: 'toolbox',
                src: [ 'inline.png', 'thumbnail.png' ],
                dest: 'output/',
            },
        }
    } );
    grunt.loadNpmTasks( 'grunt-markdown' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'js-obfuscator' );
    grunt.loadNpmTasks( 'grunt-contrib-compress' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.registerTask( 'min', [ 'uglify', 'jsObfuscate', 'sass', 'markdown', 'compress', 'copy' ] );
    grunt.registerTask( 'default', [ 'uglify', 'jsObfuscate', 'sass', 'markdown', 'compress', 'copy' ] );
};
