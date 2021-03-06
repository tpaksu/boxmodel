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
                tasks: [ 'uglify' ]
            },
            styles: {
                files: [ 'css/boxmodel.scss' ],
                tasks: 'sass'
            },
            docs: {
                files: [ 'index.md','docs/includes/template.html' ],
                tasks: 'markdown'
            }
        },
        markdown: {
            all: {
                files: [ {
                    expand: true,
                    src: ['index.md'],
                    dest: './',
                    ext: '.html'
                } ],
                options: {
                    template: 'docs/includes/template.html',
                    autoTemplate: true,
                    autoTemplateFormat: 'html'
                }
            }
        }        
    } );
    grunt.loadNpmTasks( 'grunt-markdown' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );    
    grunt.registerTask( 'min', [ 'uglify', 'sass', 'markdown' ] );
    grunt.registerTask( 'default', [ 'uglify', 'sass', 'markdown' ] );
};
