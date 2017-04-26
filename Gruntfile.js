module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                src: ['js/script.js'],
                dest: 'build/js/script.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/style.min.css': 'css/style.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/script.js'],
                tasks: 'uglify'
            },
            styles: {
                files: ['css/style.scss'],
                tasks: 'sass'
            },
            docs: {
            	files: ['documentation.md'],
            	tasks: 'markdown'
            }
        },
        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: 'documentation.md',
                    dest: 'docs/',
                    ext: '.html'
                }],
                options: {  
		    template: 'docs/includes/template.html',        
		    autoTemplate: true,
		    autoTemplateFormat: 'html'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('min', ['uglify', 'sass', 'markdown']);
    grunt.registerTask('default', ['uglify', 'sass', 'markdown']);
};
